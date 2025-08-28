import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "lucide-react"
import { ProviderAppointmentsHeader } from "@/components/dashboard/provider-appointments-header"
import { ProviderAppointmentsStats } from "@/components/dashboard/provider-appointments-stats"
import { ProviderAppointmentsList } from "@/components/dashboard/provider-appointments-list"
import Link from "next/link"

export default function ProviderAppointmentsPage() {
  return (
    <div className="space-y-6">
      <ProviderAppointmentsHeader />
      <ProviderAppointmentsStats />

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h2 className="text-xl font-semibold">Gerenciar Agendamentos</h2>
          <p className="text-muted-foreground">Visualize e gerencie todos os seus agendamentos</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/provider/availability">
              <Calendar className="mr-2 h-4 w-4" />
              Gerenciar Disponibilidade
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmados</TabsTrigger>
          <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <ProviderAppointmentsList status="pending" />
        </TabsContent>

        <TabsContent value="confirmed">
          <ProviderAppointmentsList status="confirmed" />
        </TabsContent>

        <TabsContent value="in-progress">
          <ProviderAppointmentsList status="in-progress" />
        </TabsContent>

        <TabsContent value="completed">
          <ProviderAppointmentsList status="completed" />
        </TabsContent>

        <TabsContent value="cancelled">
          <ProviderAppointmentsList status="cancelled" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
