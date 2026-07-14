import { z } from "zod"

export const createCheckoutSchema = z.object({
  successPath: z.string().startsWith("/"),
  cancelPath: z.string().startsWith("/")
})
