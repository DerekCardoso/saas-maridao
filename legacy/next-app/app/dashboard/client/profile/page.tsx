import { ClientProfileView } from "@/components/dashboard/client-profile-view"

export const metadata = {
  title: "Perfil | Cliente",
  description: "Visualize e edite seu perfil",
}

export default function ClientProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Visualize e edite suas informações de perfil.</p>
      </div>

      <ClientProfileView />
    </div>
  )
}
