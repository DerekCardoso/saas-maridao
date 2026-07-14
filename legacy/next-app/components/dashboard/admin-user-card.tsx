import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AdminUserCardProps {
  name: string
  email: string
  type: "client" | "provider" | "admin"
  status: "active" | "pending" | "suspended"
  registeredDate: string
}

export function AdminUserCard({ name, email, type, status, registeredDate }: AdminUserCardProps) {
  const getTypeBadge = () => {
    switch (type) {
      case "client":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Cliente
          </Badge>
        )
      case "provider":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Prestador
          </Badge>
        )
      case "admin":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            Admin
          </Badge>
        )
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Ativo
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Pendente
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Suspenso
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
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{name}</h3>
              <div className="flex gap-2">
                {getTypeBadge()}
                {getStatusBadge()}
              </div>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-1 h-4 w-4" />
              {email}
            </div>

            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Registrado em {registeredDate}
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
            <Button variant="outline" size="sm">
              Rejeitar
            </Button>
            <Button size="sm">Aprovar</Button>
          </div>
        )}

        {status === "active" && (
          <div className="flex gap-2">
            <Button variant="destructive" size="sm">
              Suspender
            </Button>
            <Button size="sm">Editar</Button>
          </div>
        )}

        {status === "suspended" && <Button size="sm">Reativar</Button>}
      </CardFooter>
    </Card>
  )
}
