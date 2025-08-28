import { ProviderReviewsHeader } from "@/components/dashboard/provider-reviews-header"
import { ProviderReviewsStats } from "@/components/dashboard/provider-reviews-stats"
import { ProviderReviewsList } from "@/components/dashboard/provider-reviews-list"

export default function ProviderReviewsPage() {
  return (
    <div className="space-y-6">
      <ProviderReviewsHeader />
      <ProviderReviewsStats />
      <ProviderReviewsList />
    </div>
  )
}
