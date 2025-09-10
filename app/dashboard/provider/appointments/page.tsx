import type { Metadata } from "next"
import { Suspense } from "react"
import { ProviderAppointmentsHeader } from "@/components/dashboard/provider-appointments-header"
import { ProviderAppointmentsList } from "@/components/dashboard/provider-appointments-list"

export const metadata: Metadata = {
  title: "Agendamentos | Prestador",
  description: "Gerencie todos os seus agendamentos e compromissos",
}

export default function ProviderAppointmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <ProviderAppointmentsHeader />

      <Suspense fallback={<div>Carregando agendamentos...</div>}>
        <ProviderAppointmentsList />
      </Suspense>
    </div>
  )
}
