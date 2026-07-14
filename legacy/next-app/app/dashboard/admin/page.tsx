import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, DollarSign, Users } from "lucide-react"
import { AdminUserCard } from "@/components/dashboard/admin-user-card"
import { AdminAppointmentCard } from "@/components/dashboard/admin-appointment-card"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Bem-vindo! Gerencie e monitore a plataforma Maridão.</p>
        </div>
        <Button>
          <BarChart className="mr-2 h-4 w-4" />
          Relatório Completo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,856</div>
            <p className="text-xs text-muted-foreground">+156 nos últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+324 nos últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prestadores Premium</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+28 nos últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 12.450</div>
            <p className="text-xs text-muted-foreground">+R$ 2.350 em comparação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Usuários Recentes</TabsTrigger>
          <TabsTrigger value="appointments">Agendamentos Recentes</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <AdminUserCard
            name="João Silva"
            email="joao.silva@email.com"
            type="provider"
            status="active"
            registeredDate="10 de Maio, 2025"
          />
          <AdminUserCard
            name="Ana Paula"
            email="ana.paula@email.com"
            type="client"
            status="active"
            registeredDate="12 de Maio, 2025"
          />
          <AdminUserCard
            name="Carlos Mendes"
            email="carlos.mendes@email.com"
            type="provider"
            status="pending"
            registeredDate="14 de Maio, 2025"
          />
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <AdminAppointmentCard
            clientName="Ana Paula"
            providerName="João Silva"
            service="Elétrica"
            date="15 de Maio, 2025"
            time="14:00 - 16:00"
            status="confirmed"
          />
          <AdminAppointmentCard
            clientName="Marcos Silva"
            providerName="Carlos Mendes"
            service="Montagem de Móveis"
            date="18 de Maio, 2025"
            time="09:00 - 12:00"
            status="confirmed"
          />
          <AdminAppointmentCard
            clientName="Juliana Costa"
            providerName="Roberto Almeida"
            service="Elétrica"
            date="22 de Maio, 2025"
            time="10:00 - 12:00"
            status="pending"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
