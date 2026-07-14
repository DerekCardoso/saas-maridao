import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { createRemoteJWKSet, jwtVerify } from "jose"
import { eq } from "drizzle-orm"
import { DatabaseService } from "../database/database.service"
import { profiles } from "../database/schema"
import { IS_PUBLIC_KEY } from "./public.decorator"
import type { AuthUser } from "./auth-user"

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly issuer = process.env.SUPABASE_JWT_ISSUER ?? ""
  private readonly audience = process.env.SUPABASE_JWT_AUDIENCE ?? "authenticated"
  private readonly jwks = this.issuer
    ? createRemoteJWKSet(new URL(`${this.issuer}/.well-known/jwks.json`))
    : null

  constructor(
    private readonly reflector: Reflector,
    private readonly database: DatabaseService
  ) {}

  async canActivate(context: ExecutionContext) {
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])) {
      return true
    }

    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>
      user?: AuthUser
    }>()
    const authorization = request.headers.authorization
    const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null

    if (!token || !this.jwks || !this.issuer) throw new UnauthorizedException()

    let subject: string
    let email: string
    try {
      const verified = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        audience: this.audience
      })
      subject = verified.payload.sub ?? ""
      email = typeof verified.payload.email === "string" ? verified.payload.email : ""
    } catch {
      throw new UnauthorizedException("Sessao invalida ou expirada.")
    }

    const [profile] = await this.database.db
      .select({
        role: profiles.role,
        isBlocked: profiles.isBlocked
      })
      .from(profiles)
      .where(eq(profiles.id, subject))
      .limit(1)

    if (profile?.isBlocked) throw new ForbiddenException("Conta bloqueada.")

    request.user = {
      id: subject,
      email,
      role: profile?.role ?? "client",
      isBlocked: profile?.isBlocked ?? false
    }
    return true
  }
}
