"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, MessageSquare, Phone, Play, RotateCcw } from "lucide-react"
import { useToastContext } from "@/contexts/toast-context"
import Link from "next/link"

interface ProviderAppointmentsListProps {
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
}

export function ProviderAppointmentsList({ status }: ProviderAppointmentsListProps) {
  const toast = useToastContext()
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      clientName: "Ana Paula",
      service: "Elétrica",
      date: "15 de Maio, 2025",
      time: "14:00 - 16:00",
      status: "pending",
      address: "Rua das Flores, 123 - Jardim Primavera",
      phone: "(11) 99999-1111",
      price: "R$ 150,00",
    },
    {
      id: "2",
      clientName: "Marcos Silva",
      service: "Montagem de Móveis",
      date: "18 de Maio, 2025",
      time: "09:00 - 12:00",
      status: "confirmed",
      address: "Av. Paulista, 1000 - Bela Vista",
      phone: "(11) 99999-2222",
      price: "R$ 200,00",
    },
    {
      id: "3",
      clientName: "Juliana Costa",
      service: "Hidráulica",
      date: "22 de Maio, 2025",
      time: "10:00 - 12:00",
      status: "in-progress",
      address: "Rua Augusta, 500 - Consolação",
      phone: "(11) 99999-3333",
      price: "R$ 120,00",
    },
  ])

  const filteredAppointments = appointments.filter((apt) => apt.status === status)

  const handleAccept = async (id: string) => {
    try {
      setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: "confirmed" } : apt)))

      toast.success({
        title: "Agendamento aceito",
        description: "O agendamento foi confirmado com sucesso.",
      })
    } catch (error) {
      toast.error({
        title: "Erro",
        description: "Não foi possível aceitar o agendamento.",
      })
    }
  }

  const handleReject = async (id: string) => {
    try {
      setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" } : apt)))

      toast.success({
        title: "Agendamento recusado",
        description: "O agendamento foi cancelado.",
      })
    } catch (error) {
      toast.error({
        title: "Erro",
        description: "Não foi possível recusar o agendamento.",
      })
    }
  }

  const handleStartService = async (id: string) => {
    try {
      setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: "in-progress" } : apt)))

      toast.success({
        title: "Serviço iniciado",
        description: "O serviço foi marcado como em andamento.",
      })
    } catch (error) {
      toast.error({
        title: "Erro",
        description: "Não foi possível iniciar o serviço.",
      })
    }
  }

  const handleCompleteService = async (id: string) => {
    try {
      setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: "completed" } : apt)))

      toast.success({
        title: "Serviço concluído",
        description: "O serviço foi marcado como concluído.",
      })
    } catch (error) {
      toast.error({
        title: "Erro",
        description: "Não foi possível concluir o serviço.",
      })
    }
  }

  const handleReschedule = async (id: string) => {
    toast.info({
      title: "Reagendar",
      description: "Funcionalidade de reagendamento em desenvolvimento.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Pendente
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Confirmado
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Em Andamento
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            Concluído
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Cancelado
          </Badge>
        )
      default:
        return null
    }
  }

  if (filteredAppointments.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Nenhum agendamento encontrado para este status.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {filteredAppointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {appointment.clientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{appointment.clientName}</h3>
                  {getStatusBadge(appointment.status)}
                </div>
                <p className="text-sm text-muted-foreground">{appointment.service}</p>
                <p className="text-sm font-medium text-green-600">{appointment.price}</p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {appointment.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-1 h-4 w-4" />
                    {appointment.phone}
                  </div>
                </div>

                <div className="flex items-start mt-2 text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4 mt-0.5" />
                  <span>{appointment.address}</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Mensagem
            </Button>

            <div className="flex gap-2">
              {appointment.status === "pending" && (
                <>
                  <Link href={`/dashboard/provider/appointments/${appointment.id}/reject`}>
                    <Button variant="outline" size="sm">
                      Recusar
                    </Button>
                  </Link>
                  <Link href={`/dashboard/provider/appointments/${appointment.id}/accept`}>
                    <Button size="sm">Aceitar</Button>
                  </Link>
                </>
              )}

              {appointment.status === "confirmed" && (
                <>
                  <Link href={`/dashboard/provider/appointments/${appointment.id}/reschedule`}>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reagendar
                    </Button>
                  </Link>
                  <Link href={`/dashboard/provider/appointments/${appointment.id}/start`}>
                    <Button size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Iniciar Serviço
                    </Button>
                  </Link>
                </>
              )}

              {appointment.status === "in-progress" && (
                <Button size="sm" onClick={() => handleCompleteService(appointment.id)}>
                  Concluir Serviço
                </Button>
              )}

              {(appointment.status === "completed" || appointment.status === "cancelled") && (
                <Button size="sm" variant="outline">
                  Ver Detalhes
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
