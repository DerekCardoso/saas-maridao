import { Injectable, NotFoundException } from "@nestjs/common"
import { eq } from "drizzle-orm"
import { DatabaseService } from "../database/database.service"
import { clientProfiles, profiles } from "../database/schema"
import type { AuthUser } from "../auth/auth-user"

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async bootstrap(
    authUser: AuthUser,
    input: { role: "client" | "provider"; name: string; phone: string }
  ) {
    return this.database.db.transaction(async (transaction) => {
      const [profile] = await transaction
        .insert(profiles)
        .values({
          id: authUser.id,
          email: authUser.email,
          role: input.role,
          name: input.name,
          phone: input.phone
        })
        .onConflictDoUpdate({
          target: profiles.id,
          set: {
            name: input.name,
            phone: input.phone,
            updatedAt: new Date()
          }
        })
        .returning()

      if (input.role === "client") {
        await transaction
          .insert(clientProfiles)
          .values({ userId: authUser.id })
          .onConflictDoNothing()
      }

      return profile
    })
  }

  async getMe(userId: string) {
    const [profile] = await this.database.db
      .select()
      .from(profiles)
      .where(eq(profiles.id, userId))
      .limit(1)

    if (!profile) throw new NotFoundException("Perfil nao encontrado.")
    return profile
  }

  async updateMe(userId: string, input: { name?: string; phone?: string }) {
    const [profile] = await this.database.db
      .update(profiles)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(profiles.id, userId))
      .returning()

    if (!profile) throw new NotFoundException("Perfil nao encontrado.")
    return profile
  }
}
