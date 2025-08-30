"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"

interface LoginFormProps {
  onSuccess?: () => void
  redirectUrl?: string
  hideLinks?: boolean
}

export function LoginForm({ onSuccess, redirectUrl, hideLinks = false }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await login(email, password)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      // Erro já tratado no hook de autenticação
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          {!hideLinks && (
            <Link href="/reset-password" className="text-xs text-primary hover:underline">
              Esqueceu a senha?
            </Link>
          )}
        </div>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      {!hideLinks && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Não tem uma conta?{" "}
          <Link href="/register?type=client" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
      )}
    </form>
  )
}
