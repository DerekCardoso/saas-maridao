"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { validateUserCredentials } from "@/lib/services/user-service"
import { Loader2, CheckCircle, XCircle, User, Shield, Wrench } from "lucide-react"

interface TestResult {
  email: string
  userType: string
  success: boolean
  error?: string
  userData?: any
}

export function TestLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const { toast } = useToast()

  const testCredentials = [
    {
      email: "admin@maridao.com",
      password: "123456",
      expectedType: "admin",
    },
    {
      email: "cliente@teste.com",
      password: "123456",
      expectedType: "client",
    },
    {
      email: "prestador@teste.com",
      password: "123456",
      expectedType: "provider",
    },
  ]

  const runLoginTests = async () => {
    setIsLoading(true)
    setResults([])

    const newResults: TestResult[] = []

    for (const credential of testCredentials) {
      try {
        console.log(`🧪 Testando login:`, credential.email)

        const user = await validateUserCredentials(credential.email, credential.password)

        if (user) {
          newResults.push({
            email: credential.email,
            userType: user.userType,
            success: true,
            userData: user,
          })
          console.log(`✅ Login bem-sucedido:`, user)
        } else {
          newResults.push({
            email: credential.email,
            userType: credential.expectedType,
            success: false,
            error: "Credenciais inválidas",
          })
          console.error(`❌ Login falhou para:`, credential.email)
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        newResults.push({
          email: credential.email,
          userType: credential.expectedType,
          success: false,
          error: errorMessage,
        })
        console.error(`💥 Exceção no login:`, error)
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

  const getUserIcon = (userType: string) => {
    switch (userType) {
      case "admin":
        return <Shield className="h-5 w-5 text-purple-600" />
      case "provider":
        return <Wrench className="h-5 w-5 text-blue-600" />
      case "client":
        return <User className="h-5 w-5 text-green-600" />
      default:
        return <User className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Teste de Login</CardTitle>
        <CardDescription>Teste a funcionalidade de login com as credenciais de teste</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runLoginTests} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testando logins...
            </>
          ) : (
            "Testar Todos os Logins"
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Resultados dos Testes:</h3>
            {results.map((result, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  {getUserIcon(result.userType)}
                </div>

                <div className="flex-1">
                  <div className="font-medium">{result.email}</div>
                  <div className="text-sm text-muted-foreground capitalize">Tipo: {result.userType}</div>

                  {result.success && result.userData && (
                    <div className="mt-2 text-sm space-y-1">
                      <div>
                        <strong>Nome:</strong> {result.userData.name}
                      </div>
                      <div>
                        <strong>ID:</strong> {result.userData.id}
                      </div>
                      {result.userData.phone && (
                        <div>
                          <strong>Telefone:</strong> {result.userData.phone}
                        </div>
                      )}
                      {result.userData.isPremium && (
                        <div className="text-yellow-600">
                          <strong>Premium:</strong> Sim
                        </div>
                      )}
                      {result.userData.specialties && result.userData.specialties.length > 0 && (
                        <div>
                          <strong>Especialidades:</strong> {result.userData.specialties.join(", ")}
                        </div>
                      )}
                    </div>
                  )}

                  {!result.success && result.error && (
                    <div className="text-sm text-red-600 mt-1">Erro: {result.error}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Credenciais de Teste:</h4>
          <div className="text-sm space-y-2">
            {testCredentials.map((cred, index) => (
              <div key={index} className="flex items-center gap-2">
                {getUserIcon(cred.expectedType)}
                <span className="font-mono">{cred.email}</span>
                <span className="text-muted-foreground">/ {cred.password}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
