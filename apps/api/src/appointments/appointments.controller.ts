import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common"
import {
  createAppointmentSchema,
  updateAppointmentStatusSchema,
  type AppointmentStatus,
  type CreateAppointmentInput
} from "@maridao/shared"
import { CurrentUser } from "../auth/current-user.decorator"
import type { AuthUser } from "../auth/auth-user"
import { ZodValidationPipe } from "../common/zod-validation.pipe"
import { AppointmentsService } from "./appointments.service"

@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointments: AppointmentsService) {}

  @Post()
  create(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(createAppointmentSchema)) input: CreateAppointmentInput
  ) {
    return this.appointments.create(user, input)
  }

  @Get("me")
  listMine(@CurrentUser() user: AuthUser) {
    return this.appointments.listMine(user)
  }

  @Patch(":id/status")
  updateStatus(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(updateAppointmentStatusSchema))
    body: { status: AppointmentStatus }
  ) {
    return this.appointments.updateStatus(user, id, body.status)
  }
}
