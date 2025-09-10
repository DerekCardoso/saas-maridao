"use client"

import { useState } from "react"
import { Calendar, Clock, Phone, MessageSquare, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Appointment {
  id: string
  providerName: string
  providerId: string
  service: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  price: string
  description: string
  providerPhone: string
  providerImage: string
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    providerName: "Carlos Oliveira",
    providerId: "1",
    service: "Reparo Hidráulico",
    date: "2025-01-15",
    time: "14:00",
    status: "confirmed",
    price: "R$ 150,00",
    description: "Reparo de vazamento na pia da cozinha",
    providerPhone: "(11) 99999-1234",
    providerImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    providerName: "Maria Santos",
    providerId: "2",
    service: "Instalação Elétrica",
    date: "2025-01-18",
    time: "09:00",
    status: "pending",
    price: "R$ 200,00",
    description: "Instalação de tomadas no quarto",
    providerPhone: "(11) 99999-5678",
    providerImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    providerName: "Roberto Silva",
    providerId: "3",
    service: "Pintura",
    date: "2025-01-10",
    time: "08:00",
    status: "completed",
    price: "R$ 800,00",
    description: "Pintura da sala e cozinha",
    providerPhone: "(11) 99999-9012",
    providerImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    providerName: "Ana Costa",
    providerId: "4",
    service: "Limpeza",
    date: "2025-01-05",
    time: "10:00",
    status: "cancelled",
    price: "R$ 120,00",
    description: "Limpeza geral do apartamento",
    providerPhone: "(11) 99999-3456",
    providerImage: "/placeholder.svg?height=40&width=40",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "confirmed":
      return "Confirmado"
    case "pending":
      return "Pendente"
    case "completed":
      return "Concluído"
    case "cancelled":
      return "Cancelado"
    default:
      return status
  }
}

export function ClientAppointmentsList() {
  const [appointments] = useState<Appointment[]>(mockAppointments)

  const filterAppointments = (status?: string) => {
    if (!status) return appointments
    return appointments.filter((apt) => apt.status === status)
  }

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={appointment.providerImage || "/placeholder.svg"} />
              <AvatarFallback>
                {appointment.providerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{appointment.providerName}</h3>
              <p className="text-sm text-muted-foreground">{appointment.service}</p>
              <p className="text-sm text-muted-foreground">{appointment.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(appointment.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{appointment.time}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
            <p className="font-semibold mt-2">{appointment.price}</p>
            <div className="flex space-x-2 mt-3">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                  <DropdownMenuItem>Reagendar</DropdownMenuItem>
                  <DropdownMenuItem>Cancelar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">Todos ({appointments.length})</TabsTrigger>
        <TabsTrigger value="pending">Pendentes ({filterAppointments("pending").length})</TabsTrigger>
        <TabsTrigger value="confirmed">Confirmados ({filterAppointments("confirmed").length})</TabsTrigger>
        <TabsTrigger value="completed">Concluídos ({filterAppointments("completed").length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </TabsContent>

      <TabsContent value="pending" className="space-y-4">
        {filterAppointments("pending").map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </TabsContent>

      <TabsContent value="confirmed" className="space-y-4">
        {filterAppointments("confirmed").map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4">
        {filterAppointments("completed").map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
