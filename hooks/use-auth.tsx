"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "client" | "provider" | "admin"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    type: "client",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simular usuário logado automaticamente
    if (typeof window !== "undefined") {
      localStorage.setItem("token", "mock-token")
      localStorage.setItem("userType", "client")
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simular login
    setTimeout(() => {
      setUser({
        id: "1",
        name: "João Silva",
        email: email,
        type: "client",
      })
      if (typeof window !== "undefined") {
        localStorage.setItem("token", "mock-token")
        localStorage.setItem("userType", "client")
      }
      setIsLoading(false)
    }, 1000)
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("userType")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
