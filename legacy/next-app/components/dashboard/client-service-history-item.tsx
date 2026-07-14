"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"
import { CalendarCheck, MessageSquare, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Appointment {
  id: string
  providerName: string
  providerId: string
  date: string
  service: string
  status: string
  hasReview: boolean
}

interface ClientServiceHistoryItemProps {
  appointment: Appointment
}

export function ClientServiceHistoryItem({ appointment }: ClientServiceHistoryItemProps) {
  // Formatar a data
  const formattedDate = format(new Date(appointment.date), "PPpp", { locale: ptBR })

  // Determinar a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "confirmed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Traduzir o status
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "confirmed":
        return "Confirmado"
      case "completed":
        return "Concluído"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">{appointment.service}</h3>
            <p className="text-sm text-muted-foreground">
              Prestador: {appointment.providerName} • {formattedDate}
            </p>
            <Badge className={`mt-2 ${getStatusColor(appointment.status)}`}>{getStatusText(appointment.status)}</Badge>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/client/messages/${appointment.providerId}`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Mensagem
              </Link>
            </Button>
            {appointment.status === "completed" && !appointment.hasReview && (
              <Button size="sm" asChild>
                <Link href={`/dashboard/client/appointments/${appointment.id}/review`}>
                  <Star className="mr-2 h-4 w-4" />
                  Avaliar
                </Link>
              </Button>
            )}
            {appointment.status === "completed" && appointment.hasReview && (
              <Button variant="outline" size="sm" disabled>
                <Star className="mr-2 h-4 w-4" />
                Avaliado
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/client/appointments/${appointment.id}`}>
                <CalendarCheck className="mr-2 h-4 w-4" />
                Detalhes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
