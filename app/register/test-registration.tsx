"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { testSupabaseConnection } from "@/lib/supabase"
import { createUser } from "@/lib/services/user-service"

export function TestRegistration() {
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [connectionError, setConnectionError] = useState<string>("")
  const [testResults, setTestResults] = useState<Array<{ test: string; status: "success" | "error"; message: string }>>(
    [],
  )

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
    setTestResults([])
    const results: Array<{ test: string; status: "success" | "error"; message: string }> = []

    // Test 1: Create client
    try {
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
          cep: "01234-567",
        },
      })

      if (clientResult.success) {
        results.push({
          test: "Criar Cliente",
          status: "success",
          message: `Cliente criado: ${clientResult.user?.name}`,
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
          cep: "01234-567",
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
          message: `Prestador criado: ${providerResult.user?.name}`,
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
      const duplicateResult = await createUser({
        email: "cliente@teste.com", // This should already exist
        name: "Cliente Duplicado",
        password: "123456",
        userType: "client",
      })

      if (!duplicateResult.success && duplicateResult.error?.includes("já está em uso")) {
        results.push({
          test: "Email Duplicado",
          status: "success",
          message: "Validação de email duplicado funcionando",
        })
      } else {
        results.push({ test: "Email Duplicado", status: "error", message: "Validação de email duplicado falhou" })
      }
    } catch (error) {
      results.push({
        test: "Email Duplicado",
        status: "error",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      })
    }

    setTestResults(results)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Teste de Conexão Supabase</CardTitle>
          <CardDescription>Verifique se a conexão com o Supabase está funcionando</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={testConnection} disabled={connectionStatus === "testing"}>
              {connectionStatus === "testing" ? "Testando..." : "Testar Conexão"}
            </Button>

            {connectionStatus === "success" && (
              <Badge variant="default" className="bg-green-500">
                Conexão OK
              </Badge>
            )}

            {connectionStatus === "error" && <Badge variant="destructive">Erro na Conexão</Badge>}
          </div>

          {connectionError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{connectionError}</p>
            </div>
          )}

          {connectionStatus === "error" && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h4 className="font-medium text-yellow-800 mb-2">Configuração Necessária:</h4>
              <ol className="text-sm text-yellow-700 space-y-1">
                <li>1. Configure as variáveis de ambiente no Vercel</li>
                <li>2. Execute os SQLs no Supabase SQL Editor</li>
                <li>3. Verifique se as URLs estão corretas</li>
              </ol>
            </div>
          )}
        </CardContent>
      </Card>

      {connectionStatus === "success" && (
        <Card>
          <CardHeader>
            <CardTitle>Teste de Cadastro</CardTitle>
            <CardDescription>Execute testes de criação de usuários</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runTests} className="w-full">
              Executar Testes de Cadastro
            </Button>

            {testResults.length > 0 && (
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <span className="font-medium">{result.test}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={result.status === "success" ? "default" : "destructive"}>
                        {result.status === "success" ? "Sucesso" : "Erro"}
                      </Badge>
                    </div>
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
