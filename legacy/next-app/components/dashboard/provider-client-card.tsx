import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MessageSquare } from "lucide-react"

interface ProviderClientCardProps {
  name: string
  appointmentsCount: number
  lastService: string
  lastServiceDate: string
}

export function ProviderClientCard({ name, appointmentsCount, lastService, lastServiceDate }: ProviderClientCardProps) {
  return (
    <Card className="overflow-hidden">
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
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{appointmentsCount} agendamento(s)</p>

            <div className="flex flex-col mt-2">
              <p className="text-sm">
                Último serviço: <span className="font-medium">{lastService}</span>
              </p>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {lastServiceDate}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Mensagem
        </Button>
        <Button size="sm">Ver Histórico</Button>
      </CardFooter>
    </Card>
  )
}
