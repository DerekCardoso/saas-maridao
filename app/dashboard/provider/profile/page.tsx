import { ProviderProfileView } from "@/components/dashboard/provider-profile-view"
import { ProviderProfileEdit } from "@/components/dashboard/provider-profile-edit"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProviderProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e profissionais</p>
      </div>

      <Tabs defaultValue="view" className="space-y-4">
        <TabsList>
          <TabsTrigger value="view">Visualizar Perfil</TabsTrigger>
          <TabsTrigger value="edit">Editar Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="view">
          <ProviderProfileView />
        </TabsContent>

        <TabsContent value="edit">
          <ProviderProfileEdit />
        </TabsContent>
      </Tabs>
    </div>
  )
}
