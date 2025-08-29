"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"
import { useToastContext } from "@/contexts/toast-context"

interface RegisterFormProps {
  onSuccess?: () => void
  redirectUrl?: string
  defaultType?: "client" | "provider"
  hideLinks?: boolean
}

export function RegisterForm({ onSuccess, redirectUrl, defaultType = "client", hideLinks = false }: RegisterFormProps) {
  const [userType, setUserType] = useState<"client" | "provider">(defaultType)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [cep, setCep] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [isPremium, setIsPremium] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const toast = useToastContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error({
        title: "Erro no cadastro",
        description: "As senhas não coincidem. Tente novamente.",
      })
      return
    }

    if (!acceptTerms) {
      toast.warning({
        title: "Termos não aceitos",
        description: "Você precisa aceitar os termos de uso para continuar.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulando uma chamada de API com um atraso
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Verificar se o email já está em uso (simulado)
      const emailExists = Math.random() > 0.9 // 10% de chance de simular email já em uso

      if (emailExists) {
        throw new Error("Este email já está em uso. Tente outro ou faça login.")
      }

      // Criar um novo usuário (simulado)
      const newUser = {
        id: `user-${Date.now()}`,
        firstName,
        lastName,
        email,
        phone,
        userType,
        specialty: userType === "provider" ? specialty : undefined,
        isPremium: userType === "provider" ? isPremium : undefined,
      }

      // Salvar o token no localStorage (simulado)
      localStorage.setItem("token", "mock-jwt-token")

      // Salvar informações do usuário
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: newUser.id,
          name: `${newUser.firstName} ${newUser.lastName}`,
          email: newUser.email,
          userType: newUser.userType,
        }),
      )

      toast.success({
        title: "Cadastro realizado com sucesso",
        description: "Sua conta foi criada com sucesso.",
      })

      if (onSuccess) {
        onSuccess()
      } else if (redirectUrl) {
        router.push(redirectUrl)
      } else {
        // Redirecionar com base no tipo de usuário
        if (userType === "provider") {
          router.push("/dashboard/provider")
        } else {
          router.push("/dashboard/client")
        }
      }
    } catch (error) {
      toast.error({
        title: "Erro no cadastro",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao criar sua conta. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      {!hideLinks && (
        <div className="flex space-x-4 mb-4">
          <Button
            type="button"
            variant={userType === "client" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setUserType("client")}
          >
            Cliente
          </Button>
          <Button
            type="button"
            variant={userType === "provider" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setUserType("provider")}
          >
            Prestador
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
      </div>

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
        <Label htmlFor="phone">Telefone (WhatsApp)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(00) 00000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <Input id="cep" placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} required />
      </div>

      {userType === "provider" && (
        <div className="space-y-2">
          <Label htmlFor="specialty">Especialidade Principal</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger id="specialty">
              <SelectValue placeholder="Selecione uma especialidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eletrica">Elétrica</SelectItem>
              <SelectItem value="hidraulica">Hidráulica</SelectItem>
              <SelectItem value="montagem">Montagem de Móveis</SelectItem>
              <SelectItem value="reparos">Reparos Gerais</SelectItem>
              <SelectItem value="instalacoes">Instalações</SelectItem>
              <SelectItem value="manutencao">Manutenção</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {userType === "provider" && (
        <div className="mt-6 border rounded-lg p-4 relative">
          <div className="absolute -top-3 bg-white px-2">
            <Badge className="bg-yellow-400 text-yellow-900 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Premium
            </Badge>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="premium-option" checked={isPremium} onCheckedChange={(checked) => setIsPremium(!!checked)} />
            <div>
              <label htmlFor="premium-option" className="font-medium">
                Quero me destacar com o plano Premium
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                Apareça no topo dos resultados, receba mais solicitações e tenha acesso a ferramentas exclusivas por
                apenas R$ 49,90/mês.
              </p>
              <div className="mt-2">
                <Link href="/plano-premium" className="text-sm text-primary hover:underline" target="_blank">
                  Ver todos os benefícios
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(checked) => setAcceptTerms(!!checked)} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Concordo com os{" "}
          <Link href="/termos" className="text-primary hover:underline" target="_blank">
            termos de uso
          </Link>{" "}
          e{" "}
          <Link href="/privacidade" className="text-primary hover:underline" target="_blank">
            política de privacidade
          </Link>
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </Button>

      {!hideLinks && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Faça login
          </Link>
        </p>
      )}
    </form>
  )
}
