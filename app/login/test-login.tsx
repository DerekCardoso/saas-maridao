"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function TestLogin() {
  const { toast } = useToast()
  const router = useRouter()

  const loginAs = (type: string) => {
    let userData = null

    switch (type) {
      case "client":
        userData = {
          id: "550e8400-e29b-41d4-a716-446655440001",
          name: "João Silva",
          email: "cliente@teste.com",
          userType: "client",
          phone: "(11) 99999-9999",
        }
        break
      case "provider":
        userData = {
          id: "550e8400-e29b-41d4-a716-446655440003",
          name: "Carlos Oliveira",
          email: "prestador@teste.com",
          userType: "provider",
          phone: "(11) 97777-7777",
          isPremium: true,
          specialties: ["Elétrica", "Hidráulica", "Pintura"],
        }
        break
      case "admin":
        userData = {
          id: "550e8400-e29b-41d4-a716-446655440005",
          name: "Admin Sistema",
          email: "admin@teste.com",
          userType: "admin",
          isAdmin: true,
        }
        break
    }

    if (userData) {
      localStorage.setItem("maridao_user", JSON.stringify(userData))

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a) de volta, ${userData.name}!`,
      })

      router.push(`/${type}`)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Teste Rápido</CardTitle>
        <CardDescription>Clique em um dos botões abaixo para fazer login rapidamente.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Button onClick={() => loginAs("client")} variant="outline">
          Login como Cliente
        </Button>
        <Button onClick={() => loginAs("provider")} variant="outline">
          Login como Prestador
        </Button>
        <Button onClick={() => loginAs("admin")} variant="outline">
          Login como Admin
        </Button>
      </CardContent>
    </Card>
  )
}
