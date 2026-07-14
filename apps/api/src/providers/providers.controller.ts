import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common"
import { providerProfileSchema } from "@maridao/shared"
import { CurrentUser } from "../auth/current-user.decorator"
import type { AuthUser } from "../auth/auth-user"
import { Public } from "../auth/public.decorator"
import { Roles } from "../auth/roles.decorator"
import { ZodValidationPipe } from "../common/zod-validation.pipe"
import { StorageService } from "../storage/storage.service"
import { ProvidersService } from "./providers.service"

@Controller("providers")
export class ProvidersController {
  constructor(
    private readonly providers: ProvidersService,
    private readonly storage: StorageService
  ) {}

  @Roles("provider")
  @Get("me")
  getMine(@CurrentUser() user: AuthUser) {
    return this.providers.getMine(user.id)
  }

  @Roles("provider")
  @Patch("me")
  updateMine(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(providerProfileSchema)) input: never
  ) {
    return this.providers.upsertMine(user.id, input)
  }

  @Roles("provider")
  @Post("me/avatar-upload")
  avatarUpload(
    @CurrentUser() user: AuthUser,
    @Body() body: { extension: "jpg" | "png" | "webp" }
  ) {
    return this.storage.createAvatarUpload(user.id, body.extension)
  }

  @Public()
  @Get(":id")
  getPublic(@Param("id") id: string) {
    return this.providers.getPublic(id)
  }
}
