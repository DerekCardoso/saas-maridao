import { ProviderRescheduleForm } from "@/components/dashboard/provider-reschedule-form"

interface ReschedulePageProps {
  params: {
    id: string
  }
}

export default function ReschedulePage({ params }: ReschedulePageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reagendar Serviço</h1>
        <p className="text-muted-foreground">Altere a data e horário do agendamento</p>
      </div>

      <ProviderRescheduleForm appointmentId={params.id} />
    </div>
  )
}
