import { Suspense } from "react"
import { ClientAppointmentsList } from "@/components/dashboard/client-appointments-list"
import { ClientAppointmentsHeader } from "@/components/dashboard/client-appointments-header"
import { ClientAppointmentsStats } from "@/components/dashboard/client-appointments-stats"

export const metadata = {
  title: "Agendamentos | Cliente",
  description: "Gerencie seus agendamentos de serviços",
}

export default function ClientAppointmentsPage() {
  return (
    <div className="space-y-6">
      <ClientAppointmentsHeader />

      <Suspense fallback={<div>Carregando estatísticas...</div>}>
        <ClientAppointmentsStats />
      </Suspense>

      <Suspense fallback={<div>Carregando agendamentos...</div>}>
        <ClientAppointmentsList />
      </Suspense>
    </div>
  )
}
