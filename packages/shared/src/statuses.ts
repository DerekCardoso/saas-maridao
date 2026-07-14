export const providerStatuses = [
  "draft",
  "pending",
  "approved",
  "rejected",
  "suspended"
] as const
export type ProviderStatus = (typeof providerStatuses)[number]

export const appointmentStatuses = ["pending", "confirmed", "completed", "cancelled"] as const
export type AppointmentStatus = (typeof appointmentStatuses)[number]

export const reviewStatuses = ["visible", "flagged", "hidden"] as const
export type ReviewStatus = (typeof reviewStatuses)[number]

export const subscriptionStatuses = [
  "inactive",
  "trialing",
  "active",
  "past_due",
  "cancelled"
] as const
export type SubscriptionStatus = (typeof subscriptionStatuses)[number]
