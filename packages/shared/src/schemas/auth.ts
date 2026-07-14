import { z } from "zod"
import { roles } from "../roles"

export const bootstrapProfileSchema = z.object({
  role: z.enum(["client", "provider"]),
  name: z.string().trim().min(2).max(120),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/)
})

export const updateProfileSchema = bootstrapProfileSchema
  .pick({ name: true, phone: true })
  .partial()

export const authenticatedUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(roles),
  isBlocked: z.boolean()
})
