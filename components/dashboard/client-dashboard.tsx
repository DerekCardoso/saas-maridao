"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  userType: string
}

export function ClientDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar se há um usuário logado
    const storedUser = localStorage.getItem("maridao_user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.userType !== "client") {
          toast({
            variant: "destructive",
            title: "Acesso negado",
            description: "Você não tem permissão para acessar esta página.",
          })
          router.push("/login")
          return
        }
        setUser(userData)
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
        localStorage.removeItem("maridao_user")
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
    setIsLoading(false)
  }, [router, toast])

  const handleLogout = () => {
    localStorage.removeItem("maridao_user")
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard do Cliente</h1>
        <Button onClick={handleLogout} variant="outline">
          Sair
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo(a), {user.name}!</CardTitle>
          <CardDescription>Este é o seu painel de controle como cliente.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Seus dados:</h3>
              <p>Email: {user.email}</p>
              <p>Tipo de usuário: Cliente</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <Button variant="outline">Meus Agendamentos</Button>
              <Button variant="outline">Buscar Prestadores</Button>
              <Button variant="outline">Minhas Avaliações</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos Recentes</CardTitle>
            <CardDescription>Seus últimos serviços agendados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Nenhum agendamento recente.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prestadores Favoritos</CardTitle>
            <CardDescription>Profissionais que você mais contrata</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Nenhum prestador favorito ainda.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
