"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientAppointmentCard } from "@/components/dashboard/client-appointment-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function ClientAppointmentsList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dados mockados para agendamentos
  const appointments = {
    upcoming: [
      {
        id: "1",
        providerName: "João Silva",
        providerId: "1",
        providerPhone: "11999887766",
        service: "Elétrica",
        date: "15 de Maio, 2025",
        time: "14:00 - 16:00",
        status: "confirmed",
      },
      {
        id: "2",
        providerName: "Carlos Mendes",
        providerId: "2",
        providerPhone: "11988776655",
        service: "Montagem de Móveis",
        date: "18 de Maio, 2025",
        time: "09:00 - 12:00",
        status: "confirmed",
      },
      {
        id: "3",
        providerName: "Roberto Almeida",
        providerId: "3",
        providerPhone: "11977665544",
        service: "Hidráulica",
        date: "22 de Maio, 2025",
        time: "10:00 - 12:00",
        status: "pending",
      },
    ],
    past: [
      {
        id: "4",
        providerName: "Pedro Santos",
        providerId: "4",
        providerPhone: "11966554433",
        service: "Reparos Gerais",
        date: "5 de Maio, 2025",
        time: "13:00 - 15:00",
        status: "completed",
      },
      {
        id: "5",
        providerName: "Marcos Oliveira",
        providerId: "5",
        providerPhone: "11955443322",
        service: "Instalações",
        date: "28 de Abril, 2025",
        time: "10:00 - 12:00",
        status: "completed",
      },
      {
        id: "6",
        providerName: "Lucas Ferreira",
        providerId: "6",
        providerPhone: "11944332211",
        service: "Pintura",
        date: "15 de Abril, 2025",
        time: "09:00 - 17:00",
        status: "cancelled",
      },
    ],
  }

  // Filtrar agendamentos com base na busca
  const filteredUpcoming = appointments.upcoming.filter(
    (appointment) =>
      appointment.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPast = appointments.past.filter(
    (appointment) =>
      appointment.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por profissional ou serviço..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Próximos Agendamentos</TabsTrigger>
          <TabsTrigger value="past">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {filteredUpcoming.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum agendamento encontrado.</p>
            </div>
          ) : (
            filteredUpcoming.map((appointment) => (
              <ClientAppointmentCard
                key={appointment.id}
                id={appointment.id}
                providerName={appointment.providerName}
                providerId={appointment.providerId}
                providerPhone={appointment.providerPhone}
                service={appointment.service}
                date={appointment.date}
                time={appointment.time}
                status={appointment.status}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {filteredPast.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum agendamento encontrado.</p>
            </div>
          ) : (
            filteredPast.map((appointment) => (
              <ClientAppointmentCard
                key={appointment.id}
                id={appointment.id}
                providerName={appointment.providerName}
                providerId={appointment.providerId}
                providerPhone={appointment.providerPhone}
                service={appointment.service}
                date={appointment.date}
                time={appointment.time}
                status={appointment.status}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
