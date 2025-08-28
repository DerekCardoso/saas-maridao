"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, MessageSquare, Star } from "lucide-react"
import { useToastContext } from "@/contexts/toast-context"

export function ClientProfileView() {
  const toast = useToastContext()
  const [isLoading, setIsLoading] = useState(false)

  // Dados mockados do usuário
  const userData = {
    id: "client-1",
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    memberSince: "Janeiro de 2023",
    completedServices: 12,
    favoriteProviders: 5,
    reviews: 9,
  }

  // Dados mockados de atividade recente
  const recentActivity = [
    {
      id: "1",
      type: "appointment",
      title: "Agendamento com Carlos Mendes",
      description: "Montagem de Móveis",
      date: "18 de Maio, 2025",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "2",
      type: "review",
      title: "Avaliou João Silva",
      description: "5 estrelas - Elétrica",
      date: "10 de Maio, 2025",
      icon: <Star className="h-4 w-4" />,
    },
    {
      id: "3",
      type: "message",
      title: "Mensagem para Roberto Almeida",
      description: "Sobre serviço de Hidráulica",
      date: "5 de Maio, 2025",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ]

  const handleEditProfile = () => {
    // Redirecionar para a página de configurações
    window.location.href = "/dashboard/client/settings"
  }

  const handleUploadPhoto = async () => {
    setIsLoading(true)

    try {
      // Simulando uma chamada de API com um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      })
    } catch (error) {
      toast.error({
        title: "Erro ao atualizar foto",
        description: "Ocorreu um erro ao atualizar sua foto. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
              <AvatarFallback className="text-2xl">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute bottom-0 right-0"
              onClick={handleUploadPhoto}
              disabled={isLoading}
            >
              {isLoading ? "..." : "Alterar"}
            </Button>
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <p className="text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {userData.city}, {userData.state}
                </p>
              </div>
              <Button onClick={handleEditProfile}>Editar Perfil</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="bg-primary/10">
                Cliente desde {userData.memberSince}
              </Badge>
              <Badge variant="outline" className="bg-primary/10">
                {userData.completedServices} serviços contratados
              </Badge>
              <Badge variant="outline" className="bg-primary/10">
                {userData.reviews} avaliações
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações de Contato</CardTitle>
          <CardDescription>Seus dados de contato e endereço.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Telefone</p>
            <p className="text-sm text-muted-foreground">{userData.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Endereço</p>
            <p className="text-sm text-muted-foreground">{userData.address}</p>
            <p className="text-sm text-muted-foreground">
              {userData.city}, {userData.state} - {userData.zipCode}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>Suas ações recentes na plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-2">
                <div className="mt-0.5 rounded-full bg-muted p-1">{activity.icon}</div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Ver Todo Histórico
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
