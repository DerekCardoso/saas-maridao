import { Suspense } from "react"
import { ClientReviewsList } from "@/components/dashboard/client-reviews-list"
import { ClientReviewsHeader } from "@/components/dashboard/client-reviews-header"
import { ClientReviewsStats } from "@/components/dashboard/client-reviews-stats"

export const metadata = {
  title: "Avaliações | Cliente",
  description: "Gerencie suas avaliações de serviços",
}

export default function ClientReviewsPage() {
  return (
    <div className="space-y-6">
      <ClientReviewsHeader />

      <Suspense fallback={<div>Carregando estatísticas...</div>}>
        <ClientReviewsStats />
      </Suspense>

      <Suspense fallback={<div>Carregando avaliações...</div>}>
        <ClientReviewsList />
      </Suspense>
    </div>
  )
}
