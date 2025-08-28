"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { UserResponse } from "@/lib/services/user-service"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: UserResponse | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar se estamos no ambiente do cliente
    if (typeof window !== "undefined") {
      // Verificar se há um usuário logado no localStorage
      const storedUser = localStorage.getItem("maridao_user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Erro ao carregar usuário do localStorage:", error)
          localStorage.removeItem("maridao_user")
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Erro ao fazer login")
      }

      const userData = await response.json()

      if (userData) {
        setUser(userData)
        if (typeof window !== "undefined") {
          localStorage.setItem("maridao_user", JSON.stringify(userData))
        }

        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a), ${userData.name}!`,
        })

        // Redirecionar baseado no tipo de usuário
        switch (userData.userType) {
          case "admin":
            router.push("/admin")
            break
          case "provider":
            router.push("/provider")
            break
          case "client":
            router.push("/client")
            break
          default:
            router.push("/")
        }

        return true
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos. Tente novamente.",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Erro no login:", error)
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive",
      })
      return false
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("maridao_user")
    }

    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })

    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
