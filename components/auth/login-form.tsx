"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/lib/services/user-service"
import { isSupabaseConfigured, getSupabaseConfigStatus } from "@/lib/supabase"
import { Loader2, LogIn, AlertCircle, CheckCircle, Database, Settings } from "lucide-react"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; user?: any } | null>(null)

  // Check if Supabase is configured
  const isConfigured = isSupabaseConfigured()
  const configStatus = getSupabaseConfigStatus()

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

    if (!isConfigured) {
      setResult({
        success: false,
        message: `Sistema não configurado. Configure as variáveis: ${configStatus.missingVars.join(", ")}`,
      })
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
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Configuration Status Alert */}
      {!isConfigured && (
        <Alert variant="destructive">
          <Settings className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <div className="font-medium">Sistema não configurado</div>
              <div className="text-sm">Configure as seguintes variáveis de ambiente:</div>
              <ul className="text-xs space-y-1 mt-2">
                {configStatus.missingVars.map((varName) => (
                  <li key={varName} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <code className="bg-background px-1 rounded">{varName}</code>
                  </li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Entrar
            {isConfigured && <Database className="h-4 w-4 text-green-500" />}
          </CardTitle>
          <CardDescription>
            Faça login em sua conta do Maridão
            {!isConfigured && <span className="text-red-500 block mt-1">(Configure o banco de dados primeiro)</span>}
          </CardDescription>
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
                disabled={!isConfigured}
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
                disabled={!isConfigured}
                required
              />
            </div>

            <Button type="submit" disabled={isLoading || !isConfigured} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : !isConfigured ? (
                "Configure o Sistema"
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

      {/* Configuration Help */}
      {!isConfigured && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-orange-800">Como Configurar</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-orange-700 space-y-2">
            <div>1. Crie um projeto no Supabase</div>
            <div>2. Configure as variáveis de ambiente:</div>
            <div className="pl-4 space-y-1 font-mono text-xs">
              <div>NEXT_PUBLIC_SUPABASE_URL</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY</div>
              <div>SUPABASE_SERVICE_ROLE_KEY</div>
            </div>
            <div>3. Execute os scripts SQL do projeto</div>
            <div>4. Reinicie a aplicação</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
