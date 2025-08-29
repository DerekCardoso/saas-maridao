"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { createUser } from "@/lib/services/user-service"
import { fetchAddressByCep } from "@/lib/viacep"

export function RegisterForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)

  // Common fields
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Address fields
  const [cep, setCep] = useState("")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [complement, setComplement] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  // Provider fields
  const [bio, setBio] = useState("")
  const [experienceYears, setExperienceYears] = useState("")
  const [isPremium, setIsPremium] = useState(false)
  const [specialties, setSpecialties] = useState("")

  const handleCepChange = async (value: string) => {
    setCep(value)

    if (value.replace(/\D/g, "").length === 8) {
      setCepLoading(true)
      try {
        const addressData = await fetchAddressByCep(value)
        if (addressData) {
          setStreet(addressData.logradouro)
          setNeighborhood(addressData.bairro)
          setCity(addressData.localidade)
          setState(addressData.uf)
          setComplement(addressData.complemento)
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao buscar CEP",
          variant: "destructive",
        })
      } finally {
        setCepLoading(false)
      }
    }
  }

  const handleSubmit = async (userType: "client" | "provider") => {
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const userData = {
        email,
        name,
        phone,
        password,
        userType,
        address: cep
          ? {
              street,
              number,
              complement,
              neighborhood,
              city,
              state,
              cep,
            }
          : undefined,
        providerData:
          userType === "provider"
            ? {
                bio,
                experienceYears: experienceYears ? Number.parseInt(experienceYears) : undefined,
                isPremium,
                specialties: specialties ? specialties.split(",").map((s) => s.trim()) : undefined,
              }
            : undefined,
      }

      const result = await createUser(userData)

      if (result.success) {
        toast({
          title: "Sucesso!",
          description: "Conta criada com sucesso",
        })

        // Reset form
        setEmail("")
        setName("")
        setPhone("")
        setPassword("")
        setConfirmPassword("")
        setCep("")
        setStreet("")
        setNumber("")
        setComplement("")
        setNeighborhood("")
        setCity("")
        setState("")
        setBio("")
        setExperienceYears("")
        setIsPremium(false)
        setSpecialties("")
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao criar conta",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar conta",
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
        <CardDescription>Escolha o tipo de conta que deseja criar</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="client" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client">Cliente</TabsTrigger>
            <TabsTrigger value="provider">Prestador</TabsTrigger>
          </TabsList>

          <TabsContent value="client" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Nome Completo</Label>
                  <Input
                    id="client-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-phone">Telefone</Label>
                  <Input
                    id="client-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-cep">CEP</Label>
                  <Input
                    id="client-cep"
                    value={cep}
                    onChange={(e) => handleCepChange(e.target.value)}
                    placeholder="00000-000"
                    disabled={cepLoading}
                  />
                </div>
              </div>

              {street && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="client-street">Rua</Label>
                    <Input
                      id="client-street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Nome da rua"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-number">Número</Label>
                    <Input
                      id="client-number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-password">Senha</Label>
                  <Input
                    id="client-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-confirm-password">Confirmar Senha</Label>
                  <Input
                    id="client-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua senha"
                    required
                  />
                </div>
              </div>

              <Button onClick={() => handleSubmit("client")} disabled={isLoading} className="w-full">
                {isLoading ? "Criando conta..." : "Criar Conta de Cliente"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="provider" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provider-name">Nome Completo</Label>
                  <Input
                    id="provider-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider-email">Email</Label>
                  <Input
                    id="provider-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-bio">Biografia</Label>
                <Textarea
                  id="provider-bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Conte um pouco sobre sua experiência..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provider-experience">Anos de Experiência</Label>
                  <Input
                    id="provider-experience"
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider-specialties">Especialidades</Label>
                  <Input
                    id="provider-specialties"
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    placeholder="Eletricista, Encanador, etc."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="provider-premium"
                  checked={isPremium}
                  onCheckedChange={(checked) => setIsPremium(checked as boolean)}
                />
                <Label htmlFor="provider-premium">Plano Premium</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provider-password">Senha</Label>
                  <Input
                    id="provider-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider-confirm-password">Confirmar Senha</Label>
                  <Input
                    id="provider-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua senha"
                    required
                  />
                </div>
              </div>

              <Button onClick={() => handleSubmit("provider")} disabled={isLoading} className="w-full">
                {isLoading ? "Criando conta..." : "Criar Conta de Prestador"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
