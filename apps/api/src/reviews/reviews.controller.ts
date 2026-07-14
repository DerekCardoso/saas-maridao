import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { createReviewSchema, reportReviewSchema } from "@maridao/shared"
import { CurrentUser } from "../auth/current-user.decorator"
import type { AuthUser } from "../auth/auth-user"
import { Public } from "../auth/public.decorator"
import { ZodValidationPipe } from "../common/zod-validation.pipe"
import { ReviewsService } from "./reviews.service"

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviews: ReviewsService) {}

  @Post()
  create(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(createReviewSchema))
    body: { appointmentId: string; rating: number; comment?: string }
  ) {
    return this.reviews.create(user, body)
  }

  @Public()
  @Get("provider/:providerId")
  listPublic(@Param("providerId") providerId: string) {
    return this.reviews.listPublic(providerId)
  }

  @Post(":id/report")
  report(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(reportReviewSchema)) body: { reason: string }
  ) {
    return this.reviews.report(user.id, id, body.reason)
  }
}
