"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { validateUserCredentials } from "@/lib/services/user-service"
import { Loader2, CheckCircle, XCircle, User } from "lucide-react"

interface LoginTestResult {
  email: string
  userType: string
  success: boolean
  error?: string
  userId?: string
}

export function TestLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<LoginTestResult[]>([])
  const { toast } = useToast()

  const runLoginTests = async () => {
    setIsLoading(true)
    setResults([])

    const testCredentials = [
      {
        email: "admin@maridao.com",
        password: "123456",
        userType: "admin",
      },
      {
        email: "cliente@teste.com",
        password: "123456",
        userType: "client",
      },
      {
        email: "prestador@teste.com",
        password: "123456",
        userType: "provider",
      },
    ]

    const newResults: LoginTestResult[] = []

    for (const credentials of testCredentials) {
      try {
        console.log(`🧪 Testando login para ${credentials.userType}:`, credentials.email)

        const user = await validateUserCredentials(credentials.email, credentials.password)

        if (user) {
          newResults.push({
            email: credentials.email,
            userType: credentials.userType,
            success: true,
            userId: user.id,
          })
          console.log(`✅ Login ${credentials.userType} bem-sucedido:`, user.id)
        } else {
          newResults.push({
            email: credentials.email,
            userType: credentials.userType,
            success: false,
            error: "Credenciais inválidas ou usuário não encontrado",
          })
          console.error(`❌ Falha no login ${credentials.userType}`)
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        newResults.push({
          email: credentials.email,
          userType: credentials.userType,
          success: false,
          error: errorMessage,
        })
        console.error(`💥 Exceção no login ${credentials.userType}:`, error)
      }
    }

    setResults(newResults)
    setIsLoading(false)

    const successCount = newResults.filter((r) => r.success).length
    const totalCount = newResults.length

    if (successCount === totalCount) {
      toast({
        title: "Todos os logins funcionaram! ✅",
        description: `${successCount}/${totalCount} logins bem-sucedidos`,
      })
    } else {
      toast({
        title: "Alguns logins falharam ❌",
        description: `${successCount}/${totalCount} logins bem-sucedidos`,
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Teste de Login</CardTitle>
        <CardDescription>Teste a funcionalidade de login com usuários de exemplo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runLoginTests} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testando logins...
            </>
          ) : (
            <>
              <User className="mr-2 h-4 w-4" />
              Testar Logins
            </>
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Resultados dos Testes de Login:</h3>
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
                    {result.userType} ({result.email}) - {result.success ? "Login OK" : "Login Falhou"}
                  </div>
                  {result.success && result.userId && (
                    <div className="text-sm text-muted-foreground">ID: {result.userId}</div>
                  )}
                  {!result.success && result.error && <div className="text-sm text-red-600">Erro: {result.error}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Credenciais de Teste:</h4>
          <div className="text-sm space-y-2">
            <div>
              <strong>Admin:</strong> admin@maridao.com / 123456
            </div>
            <div>
              <strong>Cliente:</strong> cliente@teste.com / 123456
            </div>
            <div>
              <strong>Prestador:</strong> prestador@teste.com / 123456
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium mb-2 text-blue-800">Pré-requisitos:</h4>
          <ul className="text-sm space-y-1 text-blue-700">
            <li>• Execute supabase/schema.sql primeiro</li>
            <li>• Execute supabase/test-users.sql para criar os usuários</li>
            <li>• Configure as variáveis de ambiente</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
