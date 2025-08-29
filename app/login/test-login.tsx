"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { loginUser } from "@/lib/services/user-service"
import { Loader2, CheckCircle, XCircle, User } from "lucide-react"

interface TestCredential {
  email: string
  password: string
  type: string
  description: string
}

export function TestLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [customEmail, setCustomEmail] = useState("")
  const [customPassword, setCustomPassword] = useState("")
  const [results, setResults] = useState<
    Array<{
      email: string
      success: boolean
      error?: string
      user?: any
    }>
  >([])
  const { toast } = useToast()

  const testCredentials: TestCredential[] = [
    {
      email: "admin@maridao.com",
      password: "123456",
      type: "admin",
      description: "Administrador do Sistema",
    },
    {
      email: "cliente@teste.com",
      password: "123456",
      type: "client",
      description: "Cliente de Teste",
    },
    {
      email: "prestador@teste.com",
      password: "123456",
      type: "provider",
      description: "Prestador de Teste",
    },
  ]

  const testLogin = async (email: string, password: string) => {
    try {
      console.log(`🔐 Testando login: ${email}`)
      const result = await loginUser(email, password)

      if (result.success) {
        console.log(`✅ Login bem-sucedido: ${email}`)
        return {
          email,
          success: true,
          user: result.user,
        }
      } else {
        console.log(`❌ Login falhou: ${email} - ${result.error}`)
        return {
          email,
          success: false,
          error: result.error,
        }
      }
    } catch (error) {
      console.error(`💥 Exceção no login: ${email}`, error)
      return {
        email,
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }

  const runAllTests = async () => {
    setIsLoading(true)
    setResults([])

    const newResults = []

    for (const credential of testCredentials) {
      const result = await testLogin(credential.email, credential.password)
      newResults.push(result)
    }

    setResults(newResults)
    setIsLoading(false)

    const successCount = newResults.filter((r) => r.success).length
    const totalCount = newResults.length

    if (successCount === totalCount) {
      toast({
        title: "Todos os logins funcionaram! ✅",
        description: `${successCount}/${totalCount} credenciais testadas com sucesso`,
      })
    } else {
      toast({
        title: "Alguns logins falharam ❌",
        description: `${successCount}/${totalCount} credenciais funcionaram`,
        variant: "destructive",
      })
    }
  }

  const testCustomLogin = async () => {
    if (!customEmail || !customPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha email e senha",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    const result = await testLogin(customEmail, customPassword)
    setResults([result])
    setIsLoading(false)

    if (result.success) {
      toast({
        title: "Login realizado com sucesso! ✅",
        description: `Bem-vindo, ${result.user?.name}`,
      })
    } else {
      toast({
        title: "Falha no login ❌",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Test Predefined Credentials */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Teste de Login - Credenciais Pré-definidas</CardTitle>
          <CardDescription>Teste as credenciais de usuários criados no banco de dados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {testCredentials.map((credential, index) => (
              <div key={index} className="p-3 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{credential.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {credential.email} / {credential.password}
                    </div>
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{credential.type}</div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={runAllTests} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testando logins...
              </>
            ) : (
              "Testar Todas as Credenciais"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Custom Login Test */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Teste de Login - Credenciais Personalizadas</CardTitle>
          <CardDescription>Teste com suas próprias credenciais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customEmail">Email</Label>
            <Input
              id="customEmail"
              type="email"
              value={customEmail}
              onChange={(e) => setCustomEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customPassword">Senha</Label>
            <Input
              id="customPassword"
              type="password"
              value={customPassword}
              onChange={(e) => setCustomPassword(e.target.value)}
              placeholder="Sua senha"
            />
          </div>

          <Button onClick={testCustomLogin} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testando login...
              </>
            ) : (
              <>
                <User className="mr-2 h-4 w-4" />
                Testar Login
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Resultados dos Testes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">
                      {result.email} - {result.success ? "Login OK" : "Login Falhou"}
                    </div>
                    {result.success && result.user && (
                      <div className="text-sm text-muted-foreground">
                        {result.user.name} ({result.user.userType})
                      </div>
                    )}
                    {!result.success && result.error && (
                      <div className="text-sm text-red-600">Erro: {result.error}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
