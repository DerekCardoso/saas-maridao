"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { createUser } from "@/lib/services/user-service"
import { fetchAddressByCep } from "@/lib/viacep"
import { Loader2, Crown, Star, Zap } from "lucide-react"

const specialties = [
  "Elétrica",
  "Hidráulica",
  "Pintura",
  "Marcenaria",
  "Jardinagem",
  "Limpeza",
  "Montagem de Móveis",
  "Ar Condicionado",
  "Outros",
]

export function RegisterForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"client" | "provider">("client")
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    bio: "",
    experienceYears: "",
    specialties: [] as string[],
    isPremium: false,
  })

  const handleCepChange = async (cep: string) => {
    setFormData((prev) => ({ ...prev, cep }))

    if (cep.length === 8) {
      try {
        const address = await fetchAddressByCep(cep)
        if (address) {
          setFormData((prev) => ({
            ...prev,
            street: address.logradouro || "",
            neighborhood: address.bairro || "",
            city: address.localidade || "",
            state: address.uf || "",
          }))

          toast({
            title: "CEP encontrado!",
            description: "Endereço preenchido automaticamente.",
          })
        }
      } catch (error) {
        toast({
          title: "Erro ao buscar CEP",
          description: "Verifique se o CEP está correto.",
          variant: "destructive",
        })
      }
    }
  }

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      specialties: checked ? [...prev.specialties, specialty] : prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Erro de validação",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    if (userType === "provider" && formData.specialties.length === 0) {
      toast({
        title: "Erro de validação",
        description: "Selecione pelo menos uma especialidade.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        userType,
        address: {
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          cep: formData.cep,
        },
        ...(userType === "provider" && {
          bio: formData.bio,
          experienceYears: Number.parseInt(formData.experienceYears) || 0,
          specialties: formData.specialties,
          isPremium: formData.isPremium,
        }),
      }

      const result = await createUser(userData)

      if (result.success) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Você já pode fazer login na plataforma.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          cep: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
          bio: "",
          experienceYears: "",
          specialties: [],
          isPremium: false,
        })

        router.push("/login")
      } else {
        toast({
          title: "Erro no cadastro",
          description: result.error || "Ocorreu um erro ao criar sua conta. Tente novamente.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro no registro:", error)
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao criar sua conta. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>Escolha o tipo de conta e preencha seus dados</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={userType} onValueChange={(value) => setUserType(value as "client" | "provider")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client">Cliente</TabsTrigger>
            <TabsTrigger value="provider">Prestador</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Dados Pessoais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dados Pessoais</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Endereço</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    type="text"
                    value={formData.cep}
                    onChange={(e) => handleCepChange(e.target.value.replace(/\D/g, ""))}
                    placeholder="00000000"
                    maxLength={8}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input
                    id="street"
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData((prev) => ({ ...prev, street: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData((prev) => ({ ...prev, number: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    type="text"
                    value={formData.complement}
                    onChange={(e) => setFormData((prev) => ({ ...prev, complement: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData((prev) => ({ ...prev, neighborhood: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dados do Prestador */}
            {userType === "provider" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Dados Profissionais</h3>

                <div>
                  <Label htmlFor="bio">Biografia</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Conte um pouco sobre sua experiência..."
                  />
                </div>

                <div>
                  <Label htmlFor="experienceYears">Anos de Experiência</Label>
                  <Input
                    id="experienceYears"
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experienceYears: e.target.value }))}
                    min="0"
                  />
                </div>

                <div>
                  <Label>Especialidades</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {specialties.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={specialty}
                          checked={formData.specialties.includes(specialty)}
                          onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                        />
                        <Label htmlFor={specialty} className="text-sm">
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seção Premium Melhorada */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Plano Premium
                  </h4>

                  <div className="border rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="isPremium"
                        checked={formData.isPremium}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, isPremium: checked as boolean }))
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="isPremium" className="text-base font-medium cursor-pointer">
                          Ativar Plano Premium
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Destaque seu perfil e apareça primeiro nos resultados de busca
                        </p>

                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Star className="h-4 w-4" />
                            <span>Aparece primeiro nos resultados</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Zap className="h-4 w-4" />
                            <span>Badge Premium no seu perfil</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Crown className="h-4 w-4" />
                            <span>Destaque visual nas listagens</span>
                          </div>
                        </div>

                        <div className="mt-3 p-2 bg-white rounded border">
                          <p className="text-sm font-medium text-gray-900">R$ 29,90/mês</p>
                          <p className="text-xs text-gray-500">Cancele quando quiser</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Criando conta...</span>
                </>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  )
}
