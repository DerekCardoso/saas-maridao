import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common"
import { z } from "zod"
import { weeklyAvailabilitySchema } from "@maridao/shared"
import { CurrentUser } from "../auth/current-user.decorator"
import type { AuthUser } from "../auth/auth-user"
import { Public } from "../auth/public.decorator"
import { Roles } from "../auth/roles.decorator"
import { ZodValidationPipe } from "../common/zod-validation.pipe"
import { AvailabilityService } from "./availability.service"

const weeklySchema = z.array(weeklyAvailabilitySchema).max(30)
const blockSchema = z.object({
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  reason: z.string().max(200).optional()
})

@Controller("availability")
export class AvailabilityController {
  constructor(private readonly availability: AvailabilityService) {}

  @Roles("provider")
  @Get("me")
  getMine(@CurrentUser() user: AuthUser) {
    return this.availability.listMine(user.id)
  }

  @Roles("provider")
  @Put("me/weekly")
  replaceWeekly(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(weeklySchema))
    body: Array<{ weekday: number; startTime: string; endTime: string }>
  ) {
    return this.availability.replaceWeekly(user.id, body)
  }

  @Roles("provider")
  @Post("me/blocks")
  createBlock(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(blockSchema))
    body: { startsAt: string; endsAt: string; reason?: string }
  ) {
    return this.availability.createBlock(user.id, body)
  }

  @Public()
  @Get(":providerId/slots")
  slots(@Param("providerId") providerId: string, @Query("date") date: string) {
    return this.availability.slots(providerId, date)
  }
}
