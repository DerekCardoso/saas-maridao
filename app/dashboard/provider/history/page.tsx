import type { Metadata } from "next"
import { Suspense } from "react"
import { ProviderServiceHistory } from "@/components/dashboard/provider-service-history"
import { ProviderServiceStats } from "@/components/dashboard/provider-service-stats"

export const metadata: Metadata = {
  title: "Histórico de Serviços | Prestador",
  description: "Visualize seu histórico completo de serviços prestados",
}

export default function ProviderHistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Serviços</h1>
        <p className="text-muted-foreground">Visualize todos os serviços que você prestou e suas avaliações.</p>
      </div>

      <Suspense fallback={<div>Carregando estatísticas...</div>}>
        <ProviderServiceStats />
      </Suspense>

      <Suspense fallback={<div>Carregando histórico...</div>}>
        <ProviderServiceHistory />
      </Suspense>
    </div>
  )
}
