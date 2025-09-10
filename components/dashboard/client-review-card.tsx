"use client"

import { Star, Calendar, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ClientReviewCardProps {
  id: string
  providerName: string
  service: string
  rating: number
  comment: string
  date: string
  status: "published" | "pending"
  providerImage?: string
  servicePrice: string
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

export function ClientReviewCard({
  id,
  providerName,
  service,
  rating,
  comment,
  date,
  status,
  providerImage,
  servicePrice,
}: ClientReviewCardProps) {
  if (status === "pending") {
    return (
      <Card className="border-dashed border-2 border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={providerImage || "/placeholder.svg"} />
                <AvatarFallback>
                  {providerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{providerName}</h3>
                <p className="text-sm text-muted-foreground">{service}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{new Date(date).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium mb-2">{servicePrice}</p>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 mb-3">
                Pendente
              </Badge>
              <div>
                <Button size="sm">Avaliar Agora</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={providerImage || "/placeholder.svg"} />
              <AvatarFallback>
                {providerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{providerName}</h3>
                  <p className="text-sm text-muted-foreground">{service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{servicePrice}</p>
                  <p className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>

              <div className="mb-3">
                <StarRating rating={rating} />
              </div>

              <p className="text-sm text-gray-700 mb-3">{comment}</p>

              <Badge variant="secondary">Publicada</Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Editar Avaliação</DropdownMenuItem>
              <DropdownMenuItem>Excluir Avaliação</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
