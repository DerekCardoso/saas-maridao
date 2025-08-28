import { ClientSettingsForm } from "@/components/dashboard/client-settings-form"

export const metadata = {
  title: "Configurações | Cliente",
  description: "Gerencie suas configurações de conta",
}

export default function ClientSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas configurações de conta e preferências.</p>
      </div>

      <ClientSettingsForm />
    </div>
  )
}
