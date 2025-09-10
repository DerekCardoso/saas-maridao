"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageSquare, TrendingUp, Users } from "lucide-react"

interface ReviewStats {
  totalReviews: number
  averageRating: number
  responseRate: number
  satisfactionRate: number
}

export function ProviderReviewsStats() {
  const [stats, setStats] = useState<ReviewStats>({
    totalReviews: 0,
    averageRating: 0,
    responseRate: 0,
    satisfactionRate: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/reviews")
        if (response.ok) {
          const reviews = await response.json()

          const totalReviews = reviews.length
          const averageRating =
            totalReviews > 0 ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / totalReviews : 0
          const responseRate =
            totalReviews > 0 ? (reviews.filter((review: any) => review.response).length / totalReviews) * 100 : 0
          const satisfactionRate =
            totalReviews > 0 ? (reviews.filter((review: any) => review.rating >= 4).length / totalReviews) * 100 : 0

          setStats({
            totalReviews,
            averageRating,
            responseRate,
            satisfactionRate,
          })
        }
      } catch (error) {
        console.error("Erro ao buscar estatísticas de avaliações:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return <div>Carregando estatísticas...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalReviews}</div>
          <p className="text-xs text-muted-foreground">Avaliações recebidas de clientes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.averageRating.toFixed(1)}
            <span className="text-sm font-normal text-muted-foreground">/5.0</span>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(stats.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.responseRate.toFixed(0)}%</div>
          <p className="text-xs text-muted-foreground">Avaliações respondidas por você</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.satisfactionRate.toFixed(0)}%</div>
          <p className="text-xs text-muted-foreground">Clientes com 4+ estrelas</p>
        </CardContent>
      </Card>
    </div>
  )
}
