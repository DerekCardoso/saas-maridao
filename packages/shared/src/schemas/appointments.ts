import { z } from "zod"
import type { AppointmentStatus } from "../statuses"
import type { Role } from "../roles"

export const createAppointmentSchema = z.object({
  providerId: z.string().uuid(),
  serviceCategoryId: z.string().uuid(),
  scheduledFor: z.string().datetime(),
  notes: z.string().trim().max(1000).optional()
})

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"])
})

const allowedTransitions: Record<Role, Partial<Record<AppointmentStatus, AppointmentStatus[]>>> = {
  client: {
    pending: ["cancelled"]
  },
  provider: {
    pending: ["confirmed", "cancelled"],
    confirmed: ["completed", "cancelled"]
  },
  admin: {
    pending: ["confirmed", "completed", "cancelled"],
    confirmed: ["pending", "completed", "cancelled"],
    completed: ["pending", "confirmed", "cancelled"],
    cancelled: ["pending", "confirmed", "completed"]
  },
  super_admin: {
    pending: ["confirmed", "completed", "cancelled"],
    confirmed: ["pending", "completed", "cancelled"],
    completed: ["pending", "confirmed", "cancelled"],
    cancelled: ["pending", "confirmed", "completed"]
  }
}

export const canTransitionAppointment = (
  currentStatus: AppointmentStatus,
  nextStatus: AppointmentStatus,
  actorRole: Role
) => allowedTransitions[actorRole][currentStatus]?.includes(nextStatus) ?? false

export const appointmentTransitionSchema = z
  .object({
    currentStatus: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    nextStatus: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    actorRole: z.enum(["client", "provider", "admin", "super_admin"])
  })
  .superRefine((value, context) => {
    if (!canTransitionAppointment(value.currentStatus, value.nextStatus, value.actorRole)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Appointment transition is not allowed for this role"
      })
    }
  })

export const weeklyAvailabilitySchema = z.object({
  weekday: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/)
})

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>
