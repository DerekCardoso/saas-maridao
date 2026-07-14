import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"
import { ProviderAppointmentCard } from "@/components/dashboard/provider-appointment-card"
import { ProviderClientCard } from "@/components/dashboard/provider-client-card"

export default function ProviderDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo de volta! Gerencie seus serviços e agendamentos.</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Gerenciar Disponibilidade
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Ativos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+3 em comparação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Concluídos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+12 em comparação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+5 em comparação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.250</div>
            <p className="text-xs text-muted-foreground">+R$ 850 em comparação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Próximos Agendamentos</TabsTrigger>
          <TabsTrigger value="past">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <ProviderAppointmentCard
            clientName="Ana Paula"
            service="Elétrica"
            date="15 de Maio, 2025"
            time="14:00 - 16:00"
            status="confirmed"
            address="Rua das Flores, 123 - Jardim Primavera"
          />
          <ProviderAppointmentCard
            clientName="Marcos Silva"
            service="Montagem de Móveis"
            date="18 de Maio, 2025"
            time="09:00 - 12:00"
            status="confirmed"
            address="Av. Paulista, 1000 - Bela Vista"
          />
          <ProviderAppointmentCard
            clientName="Juliana Costa"
            service="Elétrica"
            date="22 de Maio, 2025"
            time="10:00 - 12:00"
            status="pending"
            address="Rua Augusta, 500 - Consolação"
          />
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <ProviderAppointmentCard
            clientName="Ricardo Mendes"
            service="Reparos Gerais"
            date="5 de Maio, 2025"
            time="13:00 - 15:00"
            status="completed"
            address="Rua Oscar Freire, 200 - Jardins"
          />
          <ProviderAppointmentCard
            clientName="Fernanda Lima"
            service="Instalações"
            date="28 de Abril, 2025"
            time="10:00 - 12:00"
            status="completed"
            address="Alameda Santos, 800 - Cerqueira César"
          />
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Clientes Recentes</h2>
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ProviderClientCard
            name="Ana Paula"
            appointmentsCount={3}
            lastService="Elétrica"
            lastServiceDate="15 de Maio, 2025"
          />
          <ProviderClientCard
            name="Marcos Silva"
            appointmentsCount={2}
            lastService="Montagem de Móveis"
            lastServiceDate="18 de Maio, 2025"
          />
          <ProviderClientCard
            name="Juliana Costa"
            appointmentsCount={1}
            lastService="Elétrica"
            lastServiceDate="22 de Maio, 2025"
          />
        </div>
      </div>
    </div>
  )
}
