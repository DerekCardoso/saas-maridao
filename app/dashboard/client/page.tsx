"use client"

import { Calendar, Clock, Star, Users, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      {/* Boas-vindas */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta, João!</h2>
        <p className="text-blue-100">Encontre os melhores profissionais para seus projetos</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Concluídos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1 desde a semana passada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Dadas</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Média de 4.8 estrelas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.450</div>
            <p className="text-xs text-muted-foreground">+15% desde o mês passado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos Agendamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
            <CardDescription>Seus próximos serviços agendados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>CO</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Carlos Oliveira</p>
                <p className="text-xs text-muted-foreground">Encanador</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Amanhã</p>
                <p className="text-xs text-muted-foreground">14:00</p>
              </div>
              <Badge variant="outline">Confirmado</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Maria Santos</p>
                <p className="text-xs text-muted-foreground">Eletricista</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Sexta</p>
                <p className="text-xs text-muted-foreground">09:00</p>
              </div>
              <Badge variant="secondary">Pendente</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Roberto Silva</p>
                <p className="text-xs text-muted-foreground">Pintor</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Sábado</p>
                <p className="text-xs text-muted-foreground">08:00</p>
              </div>
              <Badge variant="outline">Confirmado</Badge>
            </div>

            <Button className="w-full bg-transparent" variant="outline">
              Ver Todos os Agendamentos
            </Button>
          </CardContent>
        </Card>

        {/* Profissionais Favoritos */}
        <Card>
          <CardHeader>
            <CardTitle>Profissionais Favoritos</CardTitle>
            <CardDescription>Seus prestadores de serviço preferidos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>CO</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Carlos Oliveira</p>
                <p className="text-xs text-muted-foreground">Encanador • 4.9 ⭐</p>
              </div>
              <Button size="sm" variant="outline">
                Contratar
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Maria Santos</p>
                <p className="text-xs text-muted-foreground">Eletricista • 4.8 ⭐</p>
              </div>
              <Button size="sm" variant="outline">
                Contratar
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Roberto Silva</p>
                <p className="text-xs text-muted-foreground">Pintor • 4.7 ⭐</p>
              </div>
              <Button size="sm" variant="outline">
                Contratar
              </Button>
            </div>

            <Button className="w-full bg-transparent" variant="outline">
              Encontrar Mais Profissionais
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse rapidamente as funcionalidades mais usadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Buscar Profissionais</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              <span>Agendar Serviço</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Star className="h-6 w-6" />
              <span>Avaliar Serviços</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
