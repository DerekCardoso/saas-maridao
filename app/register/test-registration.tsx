"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { createUser } from "@/lib/services/user-service"

export function TestRegistration() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const testClientRegistration = async () => {
    setIsLoading(true)
    try {
      const userData = {
        name: "João Cliente Teste",
        email: `joao.cliente.${Date.now()}@teste.com`,
        password: "senha123",
        phone: "(11) 99999-9999",
        userType: "client" as const,
        address: {
          street: "Av. Paulista",
          number: "1000",
          complement: "Apto 101",
          neighborhood: "Bela Vista",
          city: "São Paulo",
          state: "SP",
          cep: "01310100",
        },
      }

      console.log("Criando cliente:", userData)
      await createUser(userData)

      toast({
        title: "✅ Cliente criado com sucesso!",
        description: `Email: ${userData.email} | Endereço: ${userData.address.street}, ${userData.address.number}`,
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao criar cliente:", error)
      toast({
        title: "❌ Erro ao criar cliente",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testClientRegistration2 = async () => {
    setIsLoading(true)
    try {
      const userData = {
        name: "Ana Paula Santos",
        email: `ana.santos.${Date.now()}@teste.com`,
        password: "senha123",
        phone: "(11) 98888-8888",
        userType: "client" as const,
        address: {
          street: "Rua Oscar Freire",
          number: "500",
          complement: "Cobertura",
          neighborhood: "Jardins",
          city: "São Paulo",
          state: "SP",
          cep: "01426001",
        },
      }

      console.log("Criando cliente 2:", userData)
      await createUser(userData)

      toast({
        title: "✅ Cliente Ana criada!",
        description: `Email: ${userData.email} | Bairro: ${userData.address.neighborhood}`,
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao criar cliente 2:", error)
      toast({
        title: "❌ Erro ao criar cliente",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testProviderRegistration = async () => {
    setIsLoading(true)
    try {
      const userData = {
        name: "Maria Prestadora Premium",
        email: `maria.prestadora.${Date.now()}@teste.com`,
        password: "senha123",
        phone: "(11) 97777-7777",
        userType: "provider" as const,
        address: {
          street: "Rua Augusta",
          number: "500",
          complement: "Sala 10",
          neighborhood: "Consolação",
          city: "São Paulo",
          state: "SP",
          cep: "01305100",
        },
        bio: "Especialista em serviços domésticos com mais de 8 anos de experiência. Atendo com qualidade, pontualidade e preços justos. Trabalho com materiais de primeira qualidade e ofereço garantia em todos os serviços.",
        experienceYears: 8,
        specialties: ["Elétrica", "Hidráulica", "Pintura"],
        isPremium: true,
      }

      console.log("Criando prestador:", userData)
      await createUser(userData)

      toast({
        title: "✅ Prestador Premium criado!",
        description: `Email: ${userData.email} | Especialidades: ${userData.specialties.join(", ")}`,
        variant: "default",
      })
    } catch (error) {
      console.error("Erro ao criar prestador:", error)
      toast({
        title: "❌ Erro ao criar prestador",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-6 border rounded-lg bg-white shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">🧪 Teste Rápido de Registro</h3>
        <p className="text-sm text-gray-600 mt-1">
          Use estes botões para criar usuários de teste rapidamente com dados realistas:
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">👥 Clientes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={testClientRegistration}
              disabled={isLoading}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start border-green-200 hover:border-green-300"
            >
              <span className="font-medium">👤 João Cliente</span>
              <span className="text-xs text-gray-500 mt-1">Av. Paulista - Bela Vista</span>
            </Button>

            <Button
              onClick={testClientRegistration2}
              disabled={isLoading}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start border-green-200 hover:border-green-300"
            >
              <span className="font-medium">👩 Ana Santos</span>
              <span className="text-xs text-gray-500 mt-1">Oscar Freire - Jardins</span>
            </Button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">🔧 Prestadores</h4>
          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={testProviderRegistration}
              disabled={isLoading}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start border-orange-200 hover:border-orange-300"
            >
              <span className="font-medium">⭐ Maria Prestadora Premium</span>
              <span className="text-xs text-gray-500 mt-1">Elétrica, Hidráulica, Pintura - 8 anos exp.</span>
            </Button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Criando usuário...</span>
          </div>
        </div>
      )}
    </div>
  )
}
