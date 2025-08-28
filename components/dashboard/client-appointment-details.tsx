"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Phone, DollarSign, MessageSquare, Star } from "lucide-react"

interface ClientAppointmentDetailsProps {
  appointmentId: string
}

export function ClientAppointmentDetails({ appointmentId }: ClientAppointmentDetailsProps) {
  const router = useRouter()

  // Dados mockados do agendamento
  const [appointment] = useState({
    id: appointmentId,
    providerName: "João Silva",
    providerPhone: "(11) 99999-2222",
    providerRating: 4.8,
    service: "Elétrica",
    date: "2025-05-15",
    time: "14:00 - 16:00",
    status: "confirmed",
    address: "Rua das Flores, 123 - Jardim Primavera",
    price: "R$ 150,00",
    description: "Instalação de tomadas e troca de disjuntores",
    notes: "Prestador confirmou que trará todos os materiais necessários",
    createdAt: "2025-05-10",
  })

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

  return (
    <div className="max-w-2xl space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Agendamento #{appointment.id}</CardTitle>
            {getStatusBadge(appointment.status)}
          </div>
          <CardDescription>Criado em {new Date(appointment.createdAt).toLocaleDateString("pt-BR")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {appointment.providerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{appointment.providerName}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">{appointment.providerRating}</span>
              </div>
              <p className="text-sm text-muted-foreground">{appointment.providerPhone}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Data e Horário</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(appointment.date).toLocaleDateString("pt-BR")} - {appointment.time}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Endereço</p>
                <p className="text-sm text-muted-foreground">{appointment.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Valor</p>
                <p className="text-sm font-medium text-green-600">{appointment.price}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Serviço</p>
            <p className="text-sm text-muted-foreground">{appointment.service}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Descrição</p>
            <p className="text-sm text-muted-foreground">{appointment.description}</p>
          </div>

          {appointment.notes && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Observações</p>
              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              Mensagem
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="mr-2 h-4 w-4" />
              Ligar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
