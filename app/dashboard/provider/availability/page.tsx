import { ProviderAvailabilityManager } from "@/components/dashboard/provider-availability-manager"

export default function ProviderAvailabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gerenciar Disponibilidade</h1>
        <p className="text-muted-foreground">Configure seus horários de trabalho e disponibilidade para agendamentos</p>
      </div>

      <ProviderAvailabilityManager />
    </div>
  )
}
