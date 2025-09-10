import type { Metadata } from "next"
import { Suspense } from "react"
import { ProviderReviewsHeader } from "@/components/dashboard/provider-reviews-header"
import { ProviderReviewsStats } from "@/components/dashboard/provider-reviews-stats"
import { ProviderReviewsList } from "@/components/dashboard/provider-reviews-list"

export const metadata: Metadata = {
  title: "Avaliações | Prestador",
  description: "Visualize e responda às avaliações dos seus clientes",
}

export default function ProviderReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <ProviderReviewsHeader />

      <Suspense fallback={<div>Carregando estatísticas...</div>}>
        <ProviderReviewsStats />
      </Suspense>

      <Suspense fallback={<div>Carregando avaliações...</div>}>
        <ProviderReviewsList />
      </Suspense>
    </div>
  )
}
