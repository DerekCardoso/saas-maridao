import { Suspense } from "react"
import { AdminAppointmentsHeader } from "@/components/dashboard/admin-appointments-header"
import { AdminAppointmentsTable } from "@/components/dashboard/admin-appointments-table"
import { AdminAppointmentsStats } from "@/components/dashboard/admin-appointments-stats"

export const metadata = {
  title: "Agendamentos | Admin",
  description: "Gerencie os agendamentos da plataforma",
}

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-6">
      <AdminAppointmentsHeader />

      <Suspense fallback={<div>Carregando estatísticas...</div>}>
        <AdminAppointmentsStats />
      </Suspense>

      <Suspense fallback={<div>Carregando agendamentos...</div>}>
        <AdminAppointmentsTable />
      </Suspense>
    </div>
  )
}
