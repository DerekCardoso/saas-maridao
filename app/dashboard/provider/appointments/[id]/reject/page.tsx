import { ProviderRejectForm } from "@/components/dashboard/provider-reject-form"

interface RejectPageProps {
  params: {
    id: string
  }
}

export default function RejectPage({ params }: RejectPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recusar Agendamento</h1>
        <p className="text-muted-foreground">Informe o motivo da recusa</p>
      </div>

      <ProviderRejectForm appointmentId={params.id} />
    </div>
  )
}
