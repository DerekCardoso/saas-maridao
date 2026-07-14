import type { SubscriptionStatus } from "./statuses"

export const getPremiumVisibility = ({
  status,
  currentPeriodEnd,
  now = new Date()
}: {
  status: SubscriptionStatus
  currentPeriodEnd: Date | null
  now?: Date
}) => {
  if (status === "active" || status === "trialing") return true
  if (status !== "cancelled" || !currentPeriodEnd) return false
  return currentPeriodEnd.getTime() > now.getTime()
}
