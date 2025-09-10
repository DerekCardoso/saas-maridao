"use client"

import { useState } from "react"
import { Star, Calendar, MoreHorizontal, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Review {
  id: string
  providerName: string
  providerId: string
  service: string
  rating: number
  comment: string
  date: string
  status: "published" | "pending"
  providerImage: string
  servicePrice: string
}

const mockReviews: Review[] = [
  {
    id: "1",
    providerName: "Carlos Oliveira",
    providerId: "1",
    service: "Reparo Hidráulico",
    rating: 5,
    comment:
      "Excelente profissional! Chegou no horário, foi muito educado e resolveu o problema rapidamente. Recomendo!",
    date: "2025-01-10",
    status: "published",
    providerImage: "/placeholder.svg?height=40&width=40",
    servicePrice: "R$ 150,00",
  },
  {
    id: "2",
    providerName: "Roberto Silva",
    providerId: "3",
    service: "Pintura",
    rating: 4,
    comment: "Bom trabalho, mas demorou um pouco mais do que o esperado. No geral, ficou bem feito.",
    date: "2025-01-08",
    status: "published",
    providerImage: "/placeholder.svg?height=40&width=40",
    servicePrice: "R$ 800,00",
  },
  {
    id: "3",
    providerName: "Maria Santos",
    providerId: "2",
    service: "Instalação Elétrica",
    rating: 0,
    comment: "",
    date: "2025-01-15",
    status: "pending",
    providerImage: "/placeholder.svg?height=40&width=40",
    servicePrice: "R$ 200,00",
  },
]

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
  const starSize = size === "lg" ? "h-5 w-5" : "h-4 w-4"

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

export function ClientReviewsList() {
  const [reviews] = useState<Review[]>(mockReviews)

  const publishedReviews = reviews.filter((review) => review.status === "published")
  const pendingReviews = reviews.filter((review) => review.status === "pending")

  const PublishedReviewCard = ({ review }: { review: Review }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={review.providerImage || "/placeholder.svg"} />
              <AvatarFallback>
                {review.providerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{review.providerName}</h3>
                  <p className="text-sm text-muted-foreground">{review.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{review.servicePrice}</p>
                  <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>

              <div className="mb-3">
                <StarRating rating={review.rating} />
              </div>

              <p className="text-sm text-gray-700 mb-3">{review.comment}</p>

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

  const PendingReviewCard = ({ review }: { review: Review }) => (
    <Card className="border-dashed border-2 border-yellow-200 bg-yellow-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={review.providerImage || "/placeholder.svg"} />
              <AvatarFallback>
                {review.providerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{review.providerName}</h3>
              <p className="text-sm text-muted-foreground">{review.service}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium mb-2">{review.servicePrice}</p>
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

  return (
    <Tabs defaultValue="published" className="space-y-4">
      <TabsList>
        <TabsTrigger value="published">Publicadas ({publishedReviews.length})</TabsTrigger>
        <TabsTrigger value="pending">Pendentes ({pendingReviews.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="published" className="space-y-4">
        {publishedReviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Nenhuma avaliação publicada ainda</p>
          </div>
        ) : (
          publishedReviews.map((review) => <PublishedReviewCard key={review.id} review={review} />)
        )}
      </TabsContent>

      <TabsContent value="pending" className="space-y-4">
        {pendingReviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Nenhuma avaliação pendente</p>
          </div>
        ) : (
          pendingReviews.map((review) => <PendingReviewCard key={review.id} review={review} />)
        )}
      </TabsContent>
    </Tabs>
  )
}
