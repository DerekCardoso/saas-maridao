import { z } from "zod"

export const providerProfileSchema = z.object({
  displayName: z.string().trim().min(2).max(120),
  whatsapp: z.string().regex(/^\+?[0-9()\s-]{10,20}$/),
  bio: z.string().trim().max(1000).optional(),
  basePriceCents: z.number().int().min(0).optional(),
  cep: z.string().regex(/^\d{5}-?\d{3}$/),
  street: z.string().trim().min(2).max(160).optional(),
  number: z.string().trim().max(20).optional(),
  neighborhood: z.string().trim().max(120).optional(),
  city: z.string().trim().min(2).max(120),
  state: z.string().trim().length(2).transform((value) => value.toUpperCase()),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  serviceCategoryIds: z.array(z.string().uuid()).min(1).max(20),
  workRadiusKm: z.number().int().min(1).max(100)
})

export const providerSearchSchema = z.object({
  categoryId: z.string().uuid().optional(),
  query: z.string().trim().max(120).optional(),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  radiusKm: z.coerce.number().int().min(1).max(100).default(30),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12)
})

export const providerModerationSchema = z.object({
  status: z.enum(["approved", "rejected", "suspended"]),
  reason: z.string().trim().min(3).max(500)
})

export type ProviderProfileInput = z.infer<typeof providerProfileSchema>
export type ProviderSearchInput = z.infer<typeof providerSearchSchema>
