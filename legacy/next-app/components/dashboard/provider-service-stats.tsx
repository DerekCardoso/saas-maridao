"use client"

import { useState, useEffect } from "react"
import { Calendar, CheckCircle, Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AppointmentStats {
  total: number
  completed: number
  upcoming: number
  revenue: number
}

export function ProviderServiceStats() {
  const [stats, setStats] = useState<AppointmentStats>({
    total: 0,
    completed: 0,
    upcoming: 0,
    revenue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Buscar todos os agendamentos
        const response = await fetch("/api/appointments")
        if (response.ok) {
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

          // Simular receita (em um sistema real, isso viria do banco de dados)
          const revenue = completed * 150 // Valor médio por serviço

          setStats({
            total,
            completed,
            upcoming,
            revenue,
          })
        }
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error)
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
          <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Todos os serviços prestados até o momento</p>
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
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(stats.revenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            Valor médio por serviço:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(stats.completed > 0 ? stats.revenue / stats.completed : 0)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
