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
  const [user, setUser] = useState<User | null>({
    id: "demo-user",
    name: "João Silva",
    email: "demo@exemplo.com",
    userType: "client",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const toast = useToastContext()

  useEffect(() => {
    // Simular usuário sempre logado
    const mockUser = {
      id: "demo-user",
      name: "João Silva",
      email: "demo@exemplo.com",
      userType: "client" as const,
    }
    setUser(mockUser)
    if (typeof window !== "undefined") {
      localStorage.setItem("token", "demo-token")
      localStorage.setItem("user", JSON.stringify(mockUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

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

      const foundUser = mockUsers.find((user) => user.email === email && user.password === password)

      if (!foundUser) {
        throw new Error("Email ou senha incorretos")
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", "mock-jwt-token")
      }

      const userData = {
        id: foundUser.id,
        name: `${foundUser.firstName} ${foundUser.lastName}`,
        email: foundUser.email,
        userType: foundUser.userType,
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData))
      }
      setUser(userData)

      toast.success({
        title: "Login realizado com sucesso",
        description: "Você foi autenticado com sucesso.",
      })

      router.push(`/dashboard/${foundUser.userType}`)

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
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
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
    isAuthenticated: true, // Sempre autenticado
    login,
    logout,
  }
}
