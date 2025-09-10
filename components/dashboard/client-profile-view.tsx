"use client"

import { useState } from "react"
import { Edit, MapPin, Phone, Mail, Calendar, Star, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ClientProfileView() {
  const [isEditing, setIsEditing] = useState(false)

  const clientData = {
    name: "João Silva",
    email: "joao@exemplo.com",
    phone: "(11) 99999-0000",
    address: "Rua das Flores, 123, São Paulo - SP",
    joinDate: "Janeiro 2024",
    totalServices: 18,
    averageRating: 4.6,
    favoriteProviders: 5,
    totalSpent: "R$ 3.450,00",
  }

  const recentActivity = [
    {
      id: 1,
      type: "service_completed",
      description: "Serviço de pintura concluído",
      provider: "Roberto Silva",
      date: "2025-01-10",
      rating: 4,
    },
    {
      id: 2,
      type: "review_posted",
      description: "Avaliação publicada",
      provider: "Carlos Oliveira",
      date: "2025-01-08",
      rating: 5,
    },
    {
      id: 3,
      type: "service_scheduled",
      description: "Novo agendamento criado",
      provider: "Maria Santos",
      date: "2025-01-05",
      rating: null,
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Cliente Fiel",
      description: "Mais de 10 serviços contratados",
      icon: Award,
      earned: true,
    },
    {
      id: 2,
      title: "Avaliador Ativo",
      description: "Mais de 15 avaliações publicadas",
      icon: Star,
      earned: true,
    },
    {
      id: 3,
      title: "Cliente Premium",
      description: "Mais de R$ 5.000 em serviços",
      icon: Award,
      earned: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Perfil Principal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Informações do Perfil</CardTitle>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback className="text-lg">JS</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{clientData.name}</h2>
                <p className="text-muted-foreground">Cliente desde {clientData.joinDate}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{clientData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{clientData.phone}</span>
                </div>
                <div className="flex items-center space-x-2 md:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{clientData.address}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Contratados</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientData.totalServices}</div>
            <p className="text-xs text-muted-foreground">Total de serviços</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientData.averageRating}</div>
            <p className="text-xs text-muted-foreground">⭐⭐⭐⭐⭐</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profissionais Favoritos</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientData.favoriteProviders}</div>
            <p className="text-xs text-muted-foreground">Prestadores salvos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientData.totalSpent}</div>
            <p className="text-xs text-muted-foreground">Em serviços</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividade Recente */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Suas últimas ações na plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.provider} • {new Date(activity.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                {activity.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{activity.rating}</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Conquistas */}
        <Card>
          <CardHeader>
            <CardTitle>Conquistas</CardTitle>
            <CardDescription>Seus marcos na plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${achievement.earned ? "bg-green-100" : "bg-gray-100"}`}>
                  <achievement.icon className={`h-4 w-4 ${achievement.earned ? "text-green-600" : "text-gray-400"}`} />
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {achievement.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Conquistado
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
