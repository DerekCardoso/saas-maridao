import { Body, Controller, Post } from "@nestjs/common"
import { CurrentUser } from "../auth/current-user.decorator"
import type { AuthUser } from "../auth/auth-user"
import { AnalyticsService } from "./analytics.service"

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Post("events")
  track(
    @CurrentUser() user: AuthUser,
    @Body()
    body: {
      name: "provider_search" | "provider_view" | "whatsapp_click"
      providerId?: string
      metadata?: Record<string, unknown>
    }
  ) {
    return this.analytics.track({ ...body, userId: user.id })
  }
}
