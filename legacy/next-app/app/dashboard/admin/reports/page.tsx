import { Suspense } from "react"
import { AdminReportsHeader } from "@/components/dashboard/admin-reports-header"
import { AdminReportsCharts } from "@/components/dashboard/admin-reports-charts"
import { AdminReportsSummary } from "@/components/dashboard/admin-reports-summary"

export const metadata = {
  title: "Relatórios | Admin",
  description: "Visualize relatórios e estatísticas da plataforma",
}

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <AdminReportsHeader />

      <Suspense fallback={<div>Carregando resumo...</div>}>
        <AdminReportsSummary />
      </Suspense>

      <Suspense fallback={<div>Carregando gráficos...</div>}>
        <AdminReportsCharts />
      </Suspense>
    </div>
  )
}
