import { Body, Controller, Get, Patch } from "@nestjs/common"
import { updateProfileSchema } from "@maridao/shared"
import { CurrentUser } from "../auth/current-user.decorator"
import type { AuthUser } from "../auth/auth-user"
import { ZodValidationPipe } from "../common/zod-validation.pipe"
import { UsersService } from "./users.service"

@Controller("me")
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  getMe(@CurrentUser() user: AuthUser) {
    return this.users.getMe(user.id)
  }

  @Patch()
  updateMe(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(updateProfileSchema))
    input: { name?: string; phone?: string }
  ) {
    return this.users.updateMe(user.id, input)
  }
}
