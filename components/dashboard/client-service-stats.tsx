"use client"

import { useState, useEffect } from "react"
import { Calendar, CheckCircle, Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AppointmentStats {
  total: number
  completed: number
  upcoming: number
  cancelled: number
}

export function ClientServiceStats() {
  const [stats, setStats] = useState<AppointmentStats>({
    total: 0,
    completed: 0,
    upcoming: 0,
    cancelled: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/appointments")

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Resposta não é JSON válido")
        }

        const appointments = await response.json()

        // Calcular estatísticas
        const now = new Date()
        const total = appointments.length
        const completed = appointments.filter((appointment: any) => appointment.status === "completed").length
        const upcoming = appointments.filter(
          (appointment: any) =>
            new Date(appointment.date) > now &&
            (appointment.status === "confirmed" || appointment.status === "pending"),
        ).length
        const cancelled = appointments.filter((appointment: any) => appointment.status === "cancelled").length

        setStats({
          total,
          completed,
          upcoming,
          cancelled,
        })
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error)
        setError(error instanceof Error ? error.message : "Erro desconhecido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-full bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <p>Erro ao carregar estatísticas: {error}</p>
              <button onClick={() => window.location.reload()} className="mt-2 text-primary hover:underline">
                Tentar novamente
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Todos os serviços contratados até o momento</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Serviços Concluídos</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completed}</div>
          <p className="text-xs text-muted-foreground">
            Taxa de conclusão: {stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}%` : "0%"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Serviços Agendados</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcoming}</div>
          <p className="text-xs text-muted-foreground">Serviços confirmados ou pendentes</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Serviços Cancelados</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.cancelled}</div>
          <p className="text-xs text-muted-foreground">
            Taxa de cancelamento: {stats.total > 0 ? `${Math.round((stats.cancelled / stats.total) * 100)}%` : "0%"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
