"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ProviderAppointmentCard } from "./provider-appointment-card"

interface Appointment {
  id: string
  clientName: string
  clientId: string
  service: string
  date: string
  time: string
  status: string
  address: string
  phone: string
  price: number
  description: string
  hasReview: boolean
}

export function ProviderAppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments")
        if (response.ok) {
          const data = await response.json()
          setAppointments(data)
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  if (isLoading) {
    return <div>Carregando agendamentos...</div>
  }

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed" || appointment.status === "pending",
  )
  const pastAppointments = appointments.filter((appointment) => appointment.status === "completed")
  const cancelledAppointments = appointments.filter((appointment) => appointment.status === "cancelled")

  return (
    <Tabs defaultValue="upcoming" className="space-y-4">
      <TabsList>
        <TabsTrigger value="upcoming">Próximos ({upcomingAppointments.length})</TabsTrigger>
        <TabsTrigger value="past">Concluídos ({pastAppointments.length})</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelados ({cancelledAppointments.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="space-y-4">
        {upcomingAppointments.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="mt-2 text-lg font-semibold">Nenhum agendamento próximo</h3>
            <p className="text-muted-foreground">Você não tem agendamentos confirmados ou pendentes.</p>
          </Card>
        ) : (
          upcomingAppointments.map((appointment) => (
            <ProviderAppointmentCard
              key={appointment.id}
              clientName={appointment.clientName}
              service={appointment.service}
              date={new Date(appointment.date).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              time={appointment.time}
              status={appointment.status as "pending" | "confirmed" | "completed" | "cancelled"}
              address={appointment.address}
            />
          ))
        )}
      </TabsContent>

      <TabsContent value="past" className="space-y-4">
        {pastAppointments.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="mt-2 text-lg font-semibold">Nenhum serviço concluído</h3>
            <p className="text-muted-foreground">Você ainda não concluiu nenhum serviço.</p>
          </Card>
        ) : (
          pastAppointments.map((appointment) => (
            <ProviderAppointmentCard
              key={appointment.id}
              clientName={appointment.clientName}
              service={appointment.service}
              date={new Date(appointment.date).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              time={appointment.time}
              status={appointment.status as "pending" | "confirmed" | "completed" | "cancelled"}
              address={appointment.address}
            />
          ))
        )}
      </TabsContent>

      <TabsContent value="cancelled" className="space-y-4">
        {cancelledAppointments.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="mt-2 text-lg font-semibold">Nenhum agendamento cancelado</h3>
            <p className="text-muted-foreground">Você não tem agendamentos cancelados.</p>
          </Card>
        ) : (
          cancelledAppointments.map((appointment) => (
            <ProviderAppointmentCard
              key={appointment.id}
              clientName={appointment.clientName}
              service={appointment.service}
              date={new Date(appointment.date).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              time={appointment.time}
              status={appointment.status as "pending" | "confirmed" | "completed" | "cancelled"}
              address={appointment.address}
            />
          ))
        )}
      </TabsContent>
    </Tabs>
  )
}
