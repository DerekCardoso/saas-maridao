import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProviderAppointmentCardProps {
  clientName: string
  service: string
  date: string
  time: string
  address: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}

export function ProviderAppointmentCard({
  clientName,
  service,
  date,
  time,
  address,
  status,
}: ProviderAppointmentCardProps) {
  const getStatusBadge = () => {
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
              {clientName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{clientName}</h3>
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

            <div className="flex items-start mt-2 text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4 mt-0.5" />
              <span>{address}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Mensagem
        </Button>

        {status === "pending" && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Recusar
            </Button>
            <Button size="sm">Aceitar</Button>
          </div>
        )}

        {status === "confirmed" && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Reagendar
            </Button>
            <Button size="sm">Iniciar Serviço</Button>
          </div>
        )}

        {status === "completed" && (
          <Button size="sm" variant="outline">
            Ver Detalhes
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
