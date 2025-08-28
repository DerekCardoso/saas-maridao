"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Review {
  id: string
  clientName: string
  rating: number
  comment: string
  service: string
  date: string
  helpful: number
  responded: boolean
}

export function ProviderReviewsList() {
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      clientName: "Ana Paula",
      rating: 5,
      comment:
        "Excelente profissional! Muito pontual e caprichoso no trabalho. Resolveu o problema elétrico rapidamente e deixou tudo organizado. Recomendo!",
      service: "Elétrica",
      date: "15 de Maio, 2025",
      helpful: 8,
      responded: true,
    },
    {
      id: "2",
      clientName: "Marcos Silva",
      rating: 5,
      comment:
        "Carlos montou meus móveis com perfeição. Muito cuidadoso e atencioso. Chegou no horário combinado e terminou antes do previsto.",
      service: "Montagem de Móveis",
      date: "12 de Maio, 2025",
      helpful: 5,
      responded: false,
    },
    {
      id: "3",
      clientName: "Juliana Costa",
      rating: 4,
      comment:
        "Bom trabalho na instalação hidráulica. Profissional competente, mas poderia ter sido mais comunicativo durante o serviço.",
      service: "Hidráulica",
      date: "8 de Maio, 2025",
      helpful: 3,
      responded: true,
    },
    {
      id: "4",
      clientName: "Ricardo Mendes",
      rating: 5,
      comment:
        "Serviço impecável! Carlos é muito profissional e honesto. Explicou todo o processo e deu dicas de manutenção. Voltarei a contratar!",
      service: "Reparos Gerais",
      date: "5 de Maio, 2025",
      helpful: 12,
      responded: true,
    },
  ])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
    ))
  }

  const getFilteredReviews = (filter: string) => {
    switch (filter) {
      case "5-stars":
        return reviews.filter((review) => review.rating === 5)
      case "4-stars":
        return reviews.filter((review) => review.rating === 4)
      case "3-stars":
        return reviews.filter((review) => review.rating === 3)
      case "pending":
        return reviews.filter((review) => !review.responded)
      default:
        return reviews
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todas as Avaliações</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todas ({reviews.length})</TabsTrigger>
            <TabsTrigger value="5-stars">5 Estrelas ({reviews.filter((r) => r.rating === 5).length})</TabsTrigger>
            <TabsTrigger value="4-stars">4 Estrelas ({reviews.filter((r) => r.rating === 4).length})</TabsTrigger>
            <TabsTrigger value="3-stars">3 Estrelas ({reviews.filter((r) => r.rating === 3).length})</TabsTrigger>
            <TabsTrigger value="pending">Pendentes ({reviews.filter((r) => !r.responded).length})</TabsTrigger>
          </TabsList>

          {["all", "5-stars", "4-stars", "3-stars", "pending"].map((filter) => (
            <TabsContent key={filter} value={filter} className="space-y-4">
              {getFilteredReviews(filter).map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {review.clientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{review.clientName}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <Badge variant="outline">{review.service}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                            {!review.responded && (
                              <Badge variant="secondary" className="mt-1">
                                Pendente Resposta
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed">{review.comment}</p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{review.helpful} pessoas acharam útil</span>
                          </div>

                          <div className="flex gap-2">
                            {!review.responded && (
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Responder
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {getFilteredReviews(filter).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhuma avaliação encontrada para este filtro.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
