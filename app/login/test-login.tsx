"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/lib/services/user-service"

export function TestLogin() {
  const [email, setEmail] = useState("cliente@teste.com")
  const [password, setPassword] = useState("123456")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; user?: any } | null>(null)

  const testCredentials = [
    { email: "admin@maridao.com", password: "123456", type: "Admin" },
    { email: "cliente@teste.com", password: "123456", type: "Cliente" },
    { email: "prestador@teste.com", password: "123456", type: "Prestador" },
  ]

  const handleLogin = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const loginResult = await loginUser({ email, password })

      if (loginResult.success) {
        setResult({
          success: true,
          message: `Login realizado com sucesso! Tipo: ${loginResult.user?.userType}`,
          user: loginResult.user,
        })
      } else {
        setResult({
          success: false,
          message: loginResult.error || "Erro desconhecido",
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

  const quickLogin = (testEmail: string, testPassword: string) => {
    setEmail(testEmail)
    setPassword(testPassword)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Teste de Login</CardTitle>
          <CardDescription>Teste o sistema de login com credenciais de teste</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {testCredentials.map((cred, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => quickLogin(cred.email, cred.password)}
                className="text-xs"
              >
                {cred.type}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
            />
          </div>

          <Button onClick={handleLogin} disabled={isLoading} className="w-full">
            {isLoading ? "Fazendo Login..." : "Fazer Login"}
          </Button>

          {result && (
            <div
              className={`p-4 border rounded-md ${result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={result.success ? "default" : "destructive"}>
                  {result.success ? "Sucesso" : "Erro"}
                </Badge>
              </div>
              <p className={`text-sm ${result.success ? "text-green-800" : "text-red-800"}`}>{result.message}</p>
              {result.user && (
                <div className="mt-2 text-xs text-gray-600">
                  <p>ID: {result.user.id}</p>
                  <p>Nome: {result.user.name}</p>
                  <p>Email: {result.user.email}</p>
                  <p>Tipo: {result.user.userType}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
