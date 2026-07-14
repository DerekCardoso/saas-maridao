import type { Metadata } from "next"
import { Suspense } from "react"
import { ClientServiceHistory } from "@/components/dashboard/client-service-history"
import { ClientServiceStats } from "@/components/dashboard/client-service-stats"

export const metadata: Metadata = {
  title: "Histórico de Serviços | Cliente",
  description: "Visualize seu histórico completo de serviços contratados",
}

export default function ClientHistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Serviços</h1>
        <p className="text-muted-foreground">Visualize todos os serviços que você contratou e suas avaliações.</p>
      </div>

      <Suspense fallback={<div>Carregando estatísticas...</div>}>
        <ClientServiceStats />
      </Suspense>

      <Suspense fallback={<div>Carregando histórico...</div>}>
        <ClientServiceHistory />
      </Suspense>
    </div>
  )
}
