import type { SubscriptionStatus } from "@maridao/shared"
import type Stripe from "stripe"

export const mapStripeSubscriptionStatus = (
  status: Stripe.Subscription.Status
): SubscriptionStatus => {
  if (status === "active") return "active"
  if (status === "trialing") return "trialing"
  if (status === "canceled") return "cancelled"
  if (status === "past_due" || status === "unpaid" || status === "incomplete") {
    return "past_due"
  }
  return "inactive"
}
