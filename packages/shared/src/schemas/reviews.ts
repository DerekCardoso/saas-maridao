import { z } from "zod"

export const createReviewSchema = z.object({
  appointmentId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional()
})

export const reportReviewSchema = z.object({
  reason: z.string().trim().min(3).max(500)
})

export const moderateReviewSchema = z.object({
  status: z.enum(["visible", "flagged", "hidden"]),
  reason: z.string().trim().min(3).max(500)
})
