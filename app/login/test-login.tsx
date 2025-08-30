"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/lib/services/user-service"
import { AlertCircle, CheckCircle, User, Loader2 } from "lucide-react"

export function TestLogin() {
  const [email, setEmail] = useState("cliente@teste.com")
  const [password, setPassword] = useState("123456")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; user?: any } | null>(null)

  const testCredentials = [
    { email: "admin@maridao.com", password: "123456", type: "Admin", description: "Administrador do Sistema" },
    { email: "cliente@teste.com", password: "123456", type: "Cliente", description: "Cliente de Teste" },
    { email: "prestador@teste.com", password: "123456", type: "Prestador", description: "Prestador de Teste" },
  ]

  const handleLogin = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log("🔐 Testando login:", email)
      const loginResult = await loginUser({ email, password })

      if (loginResult.success) {
        setResult({
          success: true,
          message: `Login realizado com sucesso!`,
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
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Quick Login Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Credenciais de Teste</CardTitle>
          <CardDescription>Clique para usar credenciais pré-definidas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {testCredentials.map((cred, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{cred.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {cred.email} / {cred.password}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{cred.type}</Badge>
                  <Button size="sm" variant="outline" onClick={() => quickLogin(cred.email, cred.password)}>
                    Usar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Login Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Teste de Login
          </CardTitle>
          <CardDescription>Digite as credenciais para testar o login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fazendo Login...
              </>
            ) : (
              "Fazer Login"
            )}
          </Button>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">{result.success ? "Login Realizado com Sucesso!" : "Erro no Login"}</div>
                  <div className="text-sm">{result.message}</div>
                  {result.user && (
                    <div className="text-xs space-y-1 mt-2 p-2 bg-background rounded border">
                      <div>
                        <strong>ID:</strong> {result.user.id}
                      </div>
                      <div>
                        <strong>Nome:</strong> {result.user.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {result.user.email}
                      </div>
                      <div>
                        <strong>Tipo:</strong> {result.user.userType}
                      </div>
                      {result.user.phone && (
                        <div>
                          <strong>Telefone:</strong> {result.user.phone}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
