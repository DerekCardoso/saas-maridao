"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminReportsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Receita</CardTitle>
              <CardDescription>Receita mensal da plataforma</CardDescription>
            </div>
            <Select defaultValue="6months">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Últimos 30 dias</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="1year">Último ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de Receita</p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Serviços Populares</CardTitle>
          <CardDescription>Serviços mais agendados na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de Serviços</p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Novos Usuários</CardTitle>
          <CardDescription>Crescimento de usuários ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de Usuários</p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agendamentos</CardTitle>
              <CardDescription>Agendamentos por período</CardDescription>
            </div>
            <Tabs defaultValue="daily">
              <TabsList>
                <TabsTrigger value="daily">Diário</TabsTrigger>
                <TabsTrigger value="weekly">Semanal</TabsTrigger>
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de Agendamentos</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
