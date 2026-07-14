import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AdminAppointmentCardProps {
  clientName: string
  providerName: string
  service: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}

export function AdminAppointmentCard({
  clientName,
  providerName,
  service,
  date,
  time,
  status,
}: AdminAppointmentCardProps) {
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
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{service}</h3>
            {getStatusBadge()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Cliente</p>
              <p className="text-sm text-muted-foreground">{clientName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Prestador</p>
              <p className="text-sm text-muted-foreground">{providerName}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
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
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
        <Button variant="outline" size="sm">
          Ver Detalhes
        </Button>

        {status === "pending" && (
          <div className="flex gap-2">
            <Button variant="destructive" size="sm">
              Cancelar
            </Button>
            <Button size="sm">Confirmar</Button>
          </div>
        )}

        {(status === "confirmed" || status === "completed") && (
          <Button variant="outline" size="sm">
            Gerar Relatório
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
