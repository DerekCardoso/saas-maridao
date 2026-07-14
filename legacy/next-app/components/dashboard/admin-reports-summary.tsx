"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, Users, Calendar, Star } from "lucide-react"

export function AdminReportsSummary() {
  // Dados mockados para estatísticas
  const stats = {
    revenue: {
      value: "R$ 12.450",
      change: "+18.2%",
      trend: "up",
    },
    users: {
      value: "2,856",
      change: "+5.4%",
      trend: "up",
    },
    appointments: {
      value: "1,284",
      change: "+24.5%",
      trend: "up",
    },
    satisfaction: {
      value: "4.8",
      change: "-0.2%",
      trend: "down",
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.revenue.value}</div>
          <p className="text-xs flex items-center">
            {stats.revenue.trend === "up" ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span className={stats.revenue.trend === "up" ? "text-green-500" : "text-red-500"}>
              {stats.revenue.change}
            </span>
            <span className="text-muted-foreground ml-1">em comparação ao mês passado</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Novos Usuários</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.users.value}</div>
          <p className="text-xs flex items-center">
            {stats.users.trend === "up" ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span className={stats.users.trend === "up" ? "text-green-500" : "text-red-500"}>{stats.users.change}</span>
            <span className="text-muted-foreground ml-1">em comparação ao mês passado</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.appointments.value}</div>
          <p className="text-xs flex items-center">
            {stats.appointments.trend === "up" ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span className={stats.appointments.trend === "up" ? "text-green-500" : "text-red-500"}>
              {stats.appointments.change}
            </span>
            <span className="text-muted-foreground ml-1">em comparação ao mês passado</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satisfação do Cliente</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.satisfaction.value}</div>
          <p className="text-xs flex items-center">
            {stats.satisfaction.trend === "up" ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span className={stats.satisfaction.trend === "up" ? "text-green-500" : "text-red-500"}>
              {stats.satisfaction.change}
            </span>
            <span className="text-muted-foreground ml-1">em comparação ao mês passado</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
