"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  email: string
  userType: string
  isPremium?: boolean
  specialties?: string[]
}

export function ProviderDashboard() {
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
        if (userData.userType !== "provider") {
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
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Dashboard do Prestador</h1>
          {user.isPremium && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              Premium
            </Badge>
          )}
        </div>
        <Button onClick={handleLogout} variant="outline">
          Sair
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo(a), {user.name}!</CardTitle>
          <CardDescription>Este é o seu painel de controle como prestador de serviços.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Seus dados:</h3>
              <p>Email: {user.email}</p>
              <p>Tipo de usuário: Prestador {user.isPremium ? "Premium" : "Básico"}</p>
              {user.specialties && user.specialties.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Especialidades:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <Button variant="outline">Meus Agendamentos</Button>
              <Button variant="outline">Meu Perfil</Button>
              <Button variant="outline">Minhas Avaliações</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos Pendentes</CardTitle>
            <CardDescription>Serviços que aguardam sua confirmação</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Nenhum agendamento pendente.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avaliações Recentes</CardTitle>
            <CardDescription>O que seus clientes estão dizendo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Nenhuma avaliação recente.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
