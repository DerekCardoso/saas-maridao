"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { validateUserCredentials } from "@/lib/services/user-service"
import { Loader2, Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("client")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("🔐 Tentando fazer login com:", email)

      const user = await validateUserCredentials(email, password)

      if (!user) {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos. Tente novamente.",
          variant: "destructive",
        })
        return
      }

      console.log("✅ Login bem-sucedido:", user)

      // Store user data in localStorage for the middleware
      localStorage.setItem("token", "authenticated")
      localStorage.setItem("userType", user.userType)
      localStorage.setItem("userId", user.id)
      localStorage.setItem("userName", user.name)
      localStorage.setItem("userEmail", user.email)

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${user.name}!`,
      })

      // Redirect based on user type
      switch (user.userType) {
        case "admin":
          router.push("/dashboard/admin")
          break
        case "provider":
          router.push("/dashboard/provider")
          break
        case "client":
          router.push("/dashboard/client")
          break
        default:
          router.push("/")
      }
    } catch (error) {
      console.error("💥 Erro no login:", error)
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Entrar na sua conta</CardTitle>
        <CardDescription>Faça login para acessar sua conta</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client">Cliente</TabsTrigger>
            <TabsTrigger value="provider">Prestador</TabsTrigger>
          </TabsList>

          <TabsContent value="client" className="space-y-4 mt-6">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Entre como cliente para contratar serviços
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="provider" className="space-y-4 mt-6">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Entre como prestador para oferecer seus serviços
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-provider">Email</Label>
                <Input
                  id="email-provider"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-provider">Senha</Label>
                <div className="relative">
                  <Input
                    id="password-provider"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center space-y-2">
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            Esqueceu sua senha?
          </Link>
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium mb-2">Contas de teste:</h4>
          <div className="text-xs space-y-1">
            <div>
              <strong>Admin:</strong> admin@maridao.com
            </div>
            <div>
              <strong>Cliente:</strong> cliente@teste.com
            </div>
            <div>
              <strong>Prestador:</strong> prestador@teste.com
            </div>
            <div className="text-muted-foreground mt-1">Senha para todos: 123456</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
