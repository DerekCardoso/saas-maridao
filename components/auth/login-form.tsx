"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/lib/services/user-service"
import { Loader2, LogIn, AlertCircle, CheckCircle } from "lucide-react"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; user?: any } | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setResult(null) // Clear previous results when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setResult({ success: false, message: "Preencha todos os campos" })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const loginResult = await loginUser(formData)

      if (loginResult.success) {
        setResult({
          success: true,
          message: "Login realizado com sucesso!",
          user: loginResult.user,
        })

        // Here you would typically redirect the user or update global state
        // For now, we'll just show the success message
      } else {
        setResult({
          success: false,
          message: loginResult.error || "Erro ao fazer login",
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          Entrar
        </CardTitle>
        <CardDescription>Faça login em sua conta do Maridão</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">{result.success ? "Login Realizado!" : "Erro no Login"}</div>
                  <div className="text-sm">{result.message}</div>
                  {result.user && (
                    <div className="text-xs space-y-1 mt-2 p-2 bg-background rounded border">
                      <div>
                        <strong>Bem-vindo:</strong> {result.user.name}
                      </div>
                      <div>
                        <strong>Tipo:</strong> {result.user.userType}
                      </div>
                      <div>
                        <strong>Email:</strong> {result.user.email}
                      </div>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Não tem uma conta?{" "}
              <a href="/register" className="text-primary hover:underline">
                Cadastre-se
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
