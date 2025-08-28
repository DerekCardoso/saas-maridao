import { ProviderStartServiceForm } from "@/components/dashboard/provider-start-service-form"

interface StartServicePageProps {
  params: {
    id: string
  }
}

export default function StartServicePage({ params }: StartServicePageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Iniciar Serviço</h1>
        <p className="text-muted-foreground">Marque o início do atendimento</p>
      </div>

      <ProviderStartServiceForm appointmentId={params.id} />
    </div>
  )
}
