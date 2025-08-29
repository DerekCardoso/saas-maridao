"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { createUser } from "@/lib/services/user-service"
import { testSupabaseConnection } from "@/lib/supabase"
import { Loader2, CheckCircle, XCircle, Database, Wifi } from "lucide-react"

interface TestResult {
  type: "client" | "provider"
  success: boolean
  error?: string
  userId?: string
}

export function TestRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [connectionStatus, setConnectionStatus] = useState<{
    tested: boolean
    success: boolean
    error?: string
  }>({ tested: false, success: false })
  const { toast } = useToast()

  const testConnection = async () => {
    console.log("🔍 Testando conexão com Supabase...")
    const result = await testSupabaseConnection()
    setConnectionStatus({
      tested: true,
      success: result.success,
      error: result.error,
    })

    if (result.success) {
      toast({
        title: "Conexão OK! ✅",
        description: "Supabase está conectado corretamente",
      })
    } else {
      toast({
        title: "Erro de Conexão ❌",
        description: result.error || "Falha ao conectar com Supabase",
        variant: "destructive",
      })
    }
  }

  const runTests = async () => {
    setIsLoading(true)
    setResults([])

    // Test connection first
    await testConnection()

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
        {/* Connection Status */}
        {connectionStatus.tested && (
          <div
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              connectionStatus.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            {connectionStatus.success ? (
              <Database className="h-5 w-5 text-green-600" />
            ) : (
              <Wifi className="h-5 w-5 text-red-600" />
            )}
            <div className="flex-1">
              <div className="font-medium">Conexão Supabase: {connectionStatus.success ? "OK" : "Falhou"}</div>
              {!connectionStatus.success && connectionStatus.error && (
                <div className="text-sm text-red-600">Erro: {connectionStatus.error}</div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={testConnection} variant="outline" className="flex-1 bg-transparent">
            <Database className="mr-2 h-4 w-4" />
            Testar Conexão
          </Button>
          <Button onClick={runTests} disabled={isLoading} className="flex-1">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Executando testes...
              </>
            ) : (
              "Executar Testes de Cadastro"
            )}
          </Button>
        </div>

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
            <li>Configure as variáveis de ambiente no Vercel</li>
            <li>Teste a conexão primeiro</li>
            <li>Execute os testes de cadastro</li>
            <li>Verifique os resultados abaixo</li>
          </ol>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium mb-2 text-yellow-800">Variáveis de Ambiente Necessárias:</h4>
          <ul className="text-sm space-y-1 text-yellow-700">
            <li>• NEXT_PUBLIC_SUPABASE_URL</li>
            <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            <li>• SUPABASE_SERVICE_ROLE_KEY</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
