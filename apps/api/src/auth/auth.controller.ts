import { Body, Controller, Post } from "@nestjs/common"
import { bootstrapProfileSchema } from "@maridao/shared"
import { CurrentUser } from "./current-user.decorator"
import type { AuthUser } from "./auth-user"
import { ZodValidationPipe } from "../common/zod-validation.pipe"
import { UsersService } from "../users/users.service"

@Controller("auth")
export class AuthController {
  constructor(private readonly users: UsersService) {}

  @Post("bootstrap")
  bootstrap(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(bootstrapProfileSchema))
    input: { role: "client" | "provider"; name: string; phone: string }
  ) {
    return this.users.bootstrap(user, input)
  }
}
