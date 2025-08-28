import { ClientAppointmentDetails } from "@/components/dashboard/client-appointment-details"

interface AppointmentDetailsPageProps {
  params: {
    id: string
  }
}

export default function AppointmentDetailsPage({ params }: AppointmentDetailsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Detalhes do Agendamento</h1>
        <p className="text-muted-foreground">Informações completas do seu serviço</p>
      </div>

      <ClientAppointmentDetails appointmentId={params.id} />
    </div>
  )
}
