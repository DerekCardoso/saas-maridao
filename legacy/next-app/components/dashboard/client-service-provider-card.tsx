import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Star } from "lucide-react"

interface ClientServiceProviderCardProps {
  name: string
  rating: number
  service: string
  completedJobs: number
}

export function ClientServiceProviderCard({ name, rating, service, completedJobs }: ClientServiceProviderCardProps) {
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
            <p className="text-sm text-muted-foreground">{service}</p>

            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="ml-1 text-sm font-medium">{rating}</span>
              </div>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{completedJobs} serviços</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Mensagem
        </Button>
        <Button size="sm">Agendar</Button>
      </CardFooter>
    </Card>
  )
}
