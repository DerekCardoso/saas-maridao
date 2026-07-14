import { Body, Controller, Get, Headers, Post, RawBodyRequest, Req } from "@nestjs/common"
import type { Request } from "express"
import { createCheckoutSchema } from "@maridao/shared"
import { CurrentUser } from "../auth/current-user.decorator"
import type { AuthUser } from "../auth/auth-user"
import { Public } from "../auth/public.decorator"
import { Roles } from "../auth/roles.decorator"
import { ZodValidationPipe } from "../common/zod-validation.pipe"
import { BillingService } from "./billing.service"

@Controller("billing")
export class BillingController {
  constructor(private readonly billing: BillingService) {}

  @Roles("provider")
  @Get("me")
  getMine(@CurrentUser() user: AuthUser) {
    return this.billing.getMine(user.id)
  }

  @Roles("provider")
  @Post("checkout")
  checkout(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(createCheckoutSchema))
    body: { successPath: string; cancelPath: string }
  ) {
    return this.billing.createCheckout(user, body)
  }

  @Roles("provider")
  @Post("portal")
  portal(@CurrentUser() user: AuthUser) {
    return this.billing.createPortal(user)
  }

  @Public()
  @Post("webhook")
  webhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers("stripe-signature") signature: string | undefined
  ) {
    if (!request.rawBody) throw new Error("Raw body unavailable")
    return this.billing.handleWebhook(request.rawBody, signature)
  }
}
