"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToastContext } from "@/contexts/toast-context"

interface User {
  id: string
  name: string
  email: string
  userType: "client" | "provider" | "admin"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Mudado para false para não bloquear
  const router = useRouter()
  const toast = useToastContext()

  useEffect(() => {
    // Simular usuário logado para permitir acesso direto
    const mockUser = {
      id: "demo-user",
      name: "Usuário Demo",
      email: "demo@exemplo.com",
      userType: "client" as const,
    }
    setUser(mockUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulando uma chamada de API com um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar credenciais com os usuários mockados
      const mockUsers = [
        {
          id: "client-1",
          firstName: "João",
          lastName: "Silva",
          email: "cliente@exemplo.com",
          password: "senha123",
          userType: "client",
        },
        {
          id: "provider-1",
          firstName: "Carlos",
          lastName: "Oliveira",
          email: "prestador@exemplo.com",
          password: "senha123",
          userType: "provider",
        },
        {
          id: "admin-1",
          firstName: "Admin",
          lastName: "Sistema",
          email: "admin@exemplo.com",
          password: "admin123",
          userType: "admin",
        },
      ]

      const user = mockUsers.find((user) => user.email === email && user.password === password)

      if (!user) {
        throw new Error("Email ou senha incorretos")
      }

      // Salvar o token no localStorage (simulado)
      localStorage.setItem("token", "mock-jwt-token")

      // Salvar informações do usuário
      const userData = {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        userType: user.userType,
      }

      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      toast.success({
        title: "Login realizado com sucesso",
        description: "Você foi autenticado com sucesso.",
      })

      // Redirecionar com base no tipo de usuário
      router.push(`/dashboard/${user.userType}`)

      return userData
    } catch (error) {
      toast.error({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Email ou senha incorretos. Tente novamente.",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
    toast.info({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso.",
    })
  }

  return {
    user,
    isLoading,
    isAuthenticated: true, // Sempre autenticado para permitir acesso direto
    login,
    logout,
  }
}
