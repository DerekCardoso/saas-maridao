"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { createUser } from "@/lib/services/user-service"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

interface TestResult {
  type: "client" | "provider"
  success: boolean
  error?: string
  userId?: string
}

export function TestRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const { toast } = useToast()

  const runTests = async () => {
    setIsLoading(true)
    setResults([])

    const testUsers = [
      {
        type: "client" as const,
        data: {
          name: "Maria Teste Cliente",
          email: `cliente.teste.${Date.now()}@exemplo.com`,
          password: "123456",
          phone: "(11) 99999-3333",
          userType: "client" as const,
          address: {
            street: "Rua Teste Cliente",
            number: "100",
            neighborhood: "Bairro Teste",
            city: "São Paulo",
            state: "SP",
            cep: "01234567",
          },
        },
      },
      {
        type: "provider" as const,
        data: {
          name: "José Teste Prestador",
          email: `prestador.teste.${Date.now()}@exemplo.com`,
          password: "123456",
          phone: "(11) 99999-4444",
          userType: "provider" as const,
          address: {
            street: "Rua Teste Prestador",
            number: "200",
            neighborhood: "Bairro Teste",
            city: "São Paulo",
            state: "SP",
            cep: "01234567",
          },
          bio: "Prestador de teste com experiência em múltiplas áreas",
          experienceYears: 5,
          specialties: ["Elétrica", "Hidráulica"],
          isPremium: true,
        },
      },
    ]

    const newResults: TestResult[] = []

    for (const testUser of testUsers) {
      try {
        console.log(`🧪 Testando criação de ${testUser.type}:`, testUser.data.email)

        const result = await createUser(testUser.data)

        if (result.success) {
          newResults.push({
            type: testUser.type,
            success: true,
            userId: result.user?.id,
          })
          console.log(`✅ ${testUser.type} criado com sucesso:`, result.user?.id)
        } else {
          newResults.push({
            type: testUser.type,
            success: false,
            error: result.error,
          })
          console.error(`❌ Erro ao criar ${testUser.type}:`, result.error)
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        newResults.push({
          type: testUser.type,
          success: false,
          error: errorMessage,
        })
        console.error(`💥 Exceção ao criar ${testUser.type}:`, error)
      }
    }

    setResults(newResults)
    setIsLoading(false)

    const successCount = newResults.filter((r) => r.success).length
    const totalCount = newResults.length

    if (successCount === totalCount) {
      toast({
        title: "Todos os testes passaram! ✅",
        description: `${successCount}/${totalCount} usuários criados com sucesso`,
      })
    } else {
      toast({
        title: "Alguns testes falharam ❌",
        description: `${successCount}/${totalCount} usuários criados com sucesso`,
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Teste de Cadastro</CardTitle>
        <CardDescription>Teste a funcionalidade de cadastro criando usuários de exemplo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runTests} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Executando testes...
            </>
          ) : (
            "Executar Testes de Cadastro"
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Resultados dos Testes:</h3>
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
                  <div className="font-medium capitalize">
                    {result.type} {result.success ? "criado com sucesso" : "falhou"}
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
          <h4 className="font-medium mb-2">Instruções:</h4>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Execute o SQL schema no Supabase primeiro</li>
            <li>Configure as variáveis de ambiente</li>
            <li>Clique em "Executar Testes" para testar o cadastro</li>
            <li>Verifique os resultados abaixo</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
