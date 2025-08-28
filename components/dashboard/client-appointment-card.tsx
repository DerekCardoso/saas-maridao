import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, MessageSquare, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { WhatsAppButton } from "@/components/whatsapp-button"

interface ClientAppointmentCardProps {
  id: string
  providerName: string
  providerId: string
  providerPhone: string
  service: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}

export function ClientAppointmentCard({
  id,
  providerName,
  providerId,
  providerPhone,
  service,
  date,
  time,
  status,
}: ClientAppointmentCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Aguardando Aprovação
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Confirmado
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Concluído
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Cancelado
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {providerName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{providerName}</h3>
              {getStatusBadge()}
            </div>
            <p className="text-sm text-muted-foreground">{service}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {time}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/client/messages/${providerId}?name=${encodeURIComponent(providerName)}`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Mensagem
            </Link>
          </Button>
          <WhatsAppButton
            phoneNumber={providerPhone}
            message={`Olá ${providerName}! Estou entrando em contato sobre meu agendamento de ${service} no dia ${date}.`}
            size="sm"
            variant="outline"
          >
            WhatsApp
          </WhatsAppButton>
        </div>

        {status === "pending" && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/client/appointments/${id}/cancel`}>Cancelar</Link>
            </Button>
          </div>
        )}

        {status === "confirmed" && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/client/appointments/${id}/reschedule`}>Reagendar</Link>
            </Button>
            <Button variant="destructive" size="sm" asChild>
              <Link href={`/dashboard/client/appointments/${id}/cancel`}>Cancelar</Link>
            </Button>
          </div>
        )}

        {status === "completed" && (
          <Button size="sm" asChild>
            <Link href={`/dashboard/client/appointments/${id}/review`}>
              <Star className="mr-2 h-4 w-4" />
              Avaliar
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
