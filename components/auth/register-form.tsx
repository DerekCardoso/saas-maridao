"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AddressForm } from "@/components/address-form"
import { createUser } from "@/lib/services/user-service"
import { Loader2, User, Wrench, AlertCircle, CheckCircle } from "lucide-react"

interface AddressData {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  cep: string
}

export function RegisterForm() {
  const [userType, setUserType] = useState<"client" | "provider">("client")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [providerData, setProviderData] = useState({
    bio: "",
    experienceYears: "",
    isPremium: false,
    specialties: [] as string[],
  })
  const [address, setAddress] = useState<AddressData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; user?: any } | null>(null)

  const specialtyOptions = [
    "Eletricista",
    "Encanador",
    "Pintor",
    "Pedreiro",
    "Marceneiro",
    "Jardineiro",
    "Faxineiro",
    "Técnico em Informática",
    "Mecânico",
    "Soldador",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleProviderDataChange = (field: string, value: any) => {
    setProviderData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSpecialtyToggle = (specialty: string) => {
    setProviderData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return "Preencha todos os campos obrigatórios"
    }

    if (formData.password !== formData.confirmPassword) {
      return "As senhas não coincidem"
    }

    if (formData.password.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres"
    }

    if (!address) {
      return "Preencha o endereço"
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setResult({ success: false, message: validationError })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const userData = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        userType,
        address,
        ...(userType === "provider" && {
          providerData: {
            bio: providerData.bio,
            experienceYears: Number.parseInt(providerData.experienceYears) || 0,
            isPremium: providerData.isPremium,
            specialties: providerData.specialties,
          },
        }),
      }

      const createResult = await createUser(userData)

      if (createResult.success) {
        setResult({
          success: true,
          message: `${userType === "client" ? "Cliente" : "Prestador"} cadastrado com sucesso!`,
          user: createResult.user,
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        })
        setProviderData({
          bio: "",
          experienceYears: "",
          isPremium: false,
          specialties: [],
        })
        setAddress(null)
      } else {
        setResult({
          success: false,
          message: createResult.error || "Erro ao criar conta",
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>Preencha os dados para criar sua conta no Maridão</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-3">
            <Label>Tipo de Conta *</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={userType === "client" ? "default" : "outline"}
                onClick={() => setUserType("client")}
                className="h-20 flex-col gap-2"
              >
                <User className="h-6 w-6" />
                <span>Cliente</span>
              </Button>
              <Button
                type="button"
                variant={userType === "provider" ? "default" : "outline"}
                onClick={() => setUserType("provider")}
                className="h-20 flex-col gap-2"
              >
                <Wrench className="h-6 w-6" />
                <span>Prestador</span>
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Básicas</h3>

            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirme sua senha"
                  required
                />
              </div>
            </div>
          </div>

          {/* Provider-specific fields */}
          {userType === "provider" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informações do Prestador</h3>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={providerData.bio}
                  onChange={(e) => handleProviderDataChange("bio", e.target.value)}
                  placeholder="Conte um pouco sobre sua experiência..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceYears">Anos de Experiência</Label>
                <Input
                  id="experienceYears"
                  type="number"
                  value={providerData.experienceYears}
                  onChange={(e) => handleProviderDataChange("experienceYears", e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="space-y-3">
                <Label>Especialidades</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {specialtyOptions.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={providerData.specialties.includes(specialty)}
                        onCheckedChange={() => handleSpecialtyToggle(specialty)}
                      />
                      <Label htmlFor={specialty} className="text-sm">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPremium"
                  checked={providerData.isPremium}
                  onCheckedChange={(checked) => handleProviderDataChange("isPremium", checked)}
                />
                <Label htmlFor="isPremium">Plano Premium</Label>
              </div>
            </div>
          )}

          {/* Address Form */}
          <AddressForm onAddressChange={setAddress} />

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              `Criar Conta ${userType === "client" ? "Cliente" : "Prestador"}`
            )}
          </Button>

          {/* Result Message */}
          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">
                    {result.success ? "Conta Criada com Sucesso!" : "Erro ao Criar Conta"}
                  </div>
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
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
