import { z } from "zod"

export const blockUserSchema = z.object({
  blocked: z.boolean(),
  reason: z.string().trim().min(3).max(500)
})

export const premiumOverrideSchema = z.object({
  enabled: z.boolean(),
  reason: z.string().trim().min(3).max(500)
})
