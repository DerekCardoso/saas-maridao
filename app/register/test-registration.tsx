"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { testSupabaseConnection } from "@/lib/supabase"
import { createUser } from "@/lib/services/user-service"
import { AlertCircle, CheckCircle, Database, Loader2 } from "lucide-react"

export function TestRegistration() {
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [connectionError, setConnectionError] = useState<string>("")
  const [testResults, setTestResults] = useState<Array<{ test: string; status: "success" | "error"; message: string }>>(
    [],
  )
  const [isRunningTests, setIsRunningTests] = useState(false)

  const testConnection = async () => {
    setConnectionStatus("testing")
    setConnectionError("")

    try {
      const result = await testSupabaseConnection()

      if (result.success) {
        setConnectionStatus("success")
      } else {
        setConnectionStatus("error")
        setConnectionError(result.error || "Erro desconhecido")
      }
    } catch (error) {
      setConnectionStatus("error")
      setConnectionError(error instanceof Error ? error.message : "Erro desconhecido")
    }
  }

  const runTests = async () => {
    setIsRunningTests(true)
    setTestResults([])
    const results: Array<{ test: string; status: "success" | "error"; message: string }> = []

    // Test 1: Create client
    try {
      console.log("🧪 Testando criação de cliente...")
      const clientResult = await createUser({
        email: `cliente.teste.${Date.now()}@example.com`,
        name: "Cliente Teste",
        phone: "11999999999",
        password: "123456",
        userType: "client",
        address: {
          street: "Rua Teste",
          number: "123",
          neighborhood: "Centro",
          city: "São Paulo",
          state: "SP",
          cep: "01234567",
        },
      })

      if (clientResult.success) {
        results.push({
          test: "Criar Cliente",
          status: "success",
          message: `Cliente criado: ${clientResult.user?.name} (ID: ${clientResult.user?.id})`,
        })
      } else {
        results.push({ test: "Criar Cliente", status: "error", message: clientResult.error || "Erro desconhecido" })
      }
    } catch (error) {
      results.push({
        test: "Criar Cliente",
        status: "error",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      })
    }

    // Test 2: Create provider
    try {
      console.log("🧪 Testando criação de prestador...")
      const providerResult = await createUser({
        email: `prestador.teste.${Date.now()}@example.com`,
        name: "Prestador Teste",
        phone: "11888888888",
        password: "123456",
        userType: "provider",
        address: {
          street: "Av. Teste",
          number: "456",
          neighborhood: "Vila Teste",
          city: "São Paulo",
          state: "SP",
          cep: "01234567",
        },
        providerData: {
          bio: "Prestador de serviços teste",
          experienceYears: 5,
          isPremium: true,
          specialties: ["Eletricista", "Encanador"],
        },
      })

      if (providerResult.success) {
        results.push({
          test: "Criar Prestador",
          status: "success",
          message: `Prestador criado: ${providerResult.user?.name} (ID: ${providerResult.user?.id})`,
        })
      } else {
        results.push({ test: "Criar Prestador", status: "error", message: providerResult.error || "Erro desconhecido" })
      }
    } catch (error) {
      results.push({
        test: "Criar Prestador",
        status: "error",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      })
    }

    // Test 3: Try duplicate email
    try {
      console.log("🧪 Testando email duplicado...")
      const duplicateResult = await createUser({
        email: "cliente@teste.com", // This should already exist
        name: "Cliente Duplicado",
        password: "123456",
        userType: "client",
      })

      if (!duplicateResult.success && duplicateResult.error?.includes("já está em uso")) {
        results.push({
          test: "Validação Email Duplicado",
          status: "success",
          message: "Validação de email duplicado funcionando corretamente",
        })
      } else {
        results.push({
          test: "Validação Email Duplicado",
          status: "error",
          message: "Validação de email duplicado não funcionou como esperado",
        })
      }
    } catch (error) {
      results.push({
        test: "Validação Email Duplicado",
        status: "error",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      })
    }

    setTestResults(results)
    setIsRunningTests(false)
  }

  return (
    <div className="space-y-6">
      {/* Connection Test */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Teste de Conexão Supabase
          </CardTitle>
          <CardDescription>Verifique se a conexão com o Supabase está funcionando</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={testConnection} disabled={connectionStatus === "testing"}>
              {connectionStatus === "testing" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testando...
                </>
              ) : (
                "Testar Conexão"
              )}
            </Button>

            {connectionStatus === "success" && (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="mr-1 h-3 w-3" />
                Conexão OK
              </Badge>
            )}

            {connectionStatus === "error" && (
              <Badge variant="destructive">
                <AlertCircle className="mr-1 h-3 w-3" />
                Erro na Conexão
              </Badge>
            )}
          </div>

          {connectionError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{connectionError}</AlertDescription>
            </Alert>
          )}

          {connectionStatus === "error" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Configuração Necessária:</strong>
                <ol className="mt-2 space-y-1 text-sm">
                  <li>1. Configure as variáveis de ambiente no Vercel:</li>
                  <li className="ml-4">• NEXT_PUBLIC_SUPABASE_URL</li>
                  <li className="ml-4">• NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                  <li className="ml-4">• SUPABASE_SERVICE_ROLE_KEY</li>
                  <li>2. Execute os SQLs no Supabase SQL Editor</li>
                  <li>3. Verifique se as URLs estão corretas</li>
                </ol>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Registration Tests */}
      {connectionStatus === "success" && (
        <Card>
          <CardHeader>
            <CardTitle>Teste de Cadastro</CardTitle>
            <CardDescription>Execute testes de criação de usuários</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runTests} disabled={isRunningTests} className="w-full">
              {isRunningTests ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Executando Testes...
                </>
              ) : (
                "Executar Testes de Cadastro"
              )}
            </Button>

            {testResults.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Resultados dos Testes:</h4>
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 border rounded-md ${
                      result.status === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    {result.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{result.test}</div>
                      <div className="text-sm text-muted-foreground mt-1">{result.message}</div>
                    </div>
                    <Badge variant={result.status === "success" ? "default" : "destructive"}>
                      {result.status === "success" ? "Sucesso" : "Erro"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
