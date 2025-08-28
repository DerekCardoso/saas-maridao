import { ProviderAcceptForm } from "@/components/dashboard/provider-accept-form"

interface AcceptPageProps {
  params: {
    id: string
  }
}

export default function AcceptPage({ params }: AcceptPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Aceitar Agendamento</h1>
        <p className="text-muted-foreground">Confirme os detalhes e aceite o serviço</p>
      </div>

      <ProviderAcceptForm appointmentId={params.id} />
    </div>
  )
}
