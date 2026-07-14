import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common"
import {
  blockUserSchema,
  moderateReviewSchema,
  premiumOverrideSchema,
  providerModerationSchema
} from "@maridao/shared"
import { CurrentUser } from "../auth/current-user.decorator"
import type { AuthUser } from "../auth/auth-user"
import { Roles } from "../auth/roles.decorator"
import { ZodValidationPipe } from "../common/zod-validation.pipe"
import { AdminService } from "./admin.service"

@Roles("admin", "super_admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get("metrics")
  metrics() {
    return this.admin.metrics()
  }

  @Get("users")
  users(@Query("page") page = "1", @Query("limit") limit = "25") {
    return this.admin.listUsers(Number(page), Number(limit))
  }

  @Patch("users/:id/block")
  blockUser(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(blockUserSchema))
    body: { blocked: boolean; reason: string }
  ) {
    return this.admin.blockUser(user, id, body.blocked, body.reason)
  }

  @Get("providers")
  providers(@Query("status") status?: string) {
    return this.admin.listProviders(status)
  }

  @Patch("providers/:id/moderation")
  moderateProvider(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(providerModerationSchema))
    body: { status: "approved" | "rejected" | "suspended"; reason: string }
  ) {
    return this.admin.moderateProvider(user, id, body)
  }

  @Get("reviews")
  reviews(@Query("status") status?: string) {
    return this.admin.listReviews(status)
  }

  @Patch("reviews/:id/moderation")
  moderateReview(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(moderateReviewSchema))
    body: { status: "visible" | "flagged" | "hidden"; reason: string }
  ) {
    return this.admin.moderateReview(user, id, body)
  }

  @Get("subscriptions")
  subscriptions() {
    return this.admin.listSubscriptions()
  }

  @Roles("super_admin")
  @Patch("providers/:id/premium-override")
  premiumOverride(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(premiumOverrideSchema))
    body: { enabled: boolean; reason: string }
  ) {
    return this.admin.overridePremium(user, id, body.enabled, body.reason)
  }
}
