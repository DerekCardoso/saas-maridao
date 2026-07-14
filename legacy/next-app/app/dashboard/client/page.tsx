import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Search } from "lucide-react"
import { ClientAppointmentCard } from "@/components/dashboard/client-appointment-card"
import { ClientServiceProviderCard } from "@/components/dashboard/client-service-provider-card"
import Link from "next/link"

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Gerencie seus agendamentos e encontre profissionais.
          </p>
        </div>
        <Button asChild>
          <Link href="/search">
            <Search className="mr-2 h-4 w-4" />
            Buscar Profissionais
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Ativos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 em comparação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Concluídos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+4 em comparação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profissionais Favoritos</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 em comparação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Enviadas</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">+3 em comparação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Próximos Agendamentos</TabsTrigger>
          <TabsTrigger value="past">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <ClientAppointmentCard
            id="1"
            providerName="João Silva"
            providerId="1"
            providerPhone="11999887766"
            service="Elétrica"
            date="15 de Maio, 2025"
            time="14:00 - 16:00"
            status="confirmed"
          />
          <ClientAppointmentCard
            id="2"
            providerName="Carlos Mendes"
            providerId="2"
            providerPhone="11988776655"
            service="Montagem de Móveis"
            date="18 de Maio, 2025"
            time="09:00 - 12:00"
            status="confirmed"
          />
          <ClientAppointmentCard
            id="3"
            providerName="Roberto Almeida"
            providerId="3"
            providerPhone="11977665544"
            service="Hidráulica"
            date="22 de Maio, 2025"
            time="10:00 - 12:00"
            status="pending"
          />
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <ClientAppointmentCard
            id="4"
            providerName="Pedro Santos"
            providerId="4"
            providerPhone="11966554433"
            service="Reparos Gerais"
            date="5 de Maio, 2025"
            time="13:00 - 15:00"
            status="completed"
          />
          <ClientAppointmentCard
            id="5"
            providerName="Marcos Oliveira"
            providerId="5"
            providerPhone="11955443322"
            service="Instalações"
            date="28 de Abril, 2025"
            time="10:00 - 12:00"
            status="completed"
          />
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Profissionais Favoritos</h2>
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ClientServiceProviderCard name="João Silva" rating={4.8} service="Elétrica" completedJobs={32} />
          <ClientServiceProviderCard
            name="Carlos Mendes"
            rating={4.9}
            service="Montagem de Móveis"
            completedJobs={45}
          />
          <ClientServiceProviderCard name="Roberto Almeida" rating={4.7} service="Hidráulica" completedJobs={28} />
        </div>
      </div>
    </div>
  )
}
