"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { fetchAddressByCep } from "@/lib/cep-service"
import { useToast } from "@/components/ui/use-toast"

interface CepSearchProps {
  onSearch?: (cep: string, location: any) => void
  redirectToSearch?: boolean
  className?: string
}

export function CepSearch({ onSearch, redirectToSearch = true, className }: CepSearchProps) {
  const [cep, setCep] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    // Formata o CEP como 00000-000
    if (value.length > 5) {
      value = value.substring(0, 5) + "-" + value.substring(5, 8)
    }

    setCep(value)
  }

  const handleSearch = async () => {
    if (cep.length < 8) {
      toast({
        title: "CEP inválido",
        description: "Por favor, digite um CEP válido",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const location = await fetchAddressByCep(cep)

      if (!location) {
        toast({
          title: "CEP não encontrado",
          description: "Não foi possível encontrar o endereço para este CEP",
          variant: "destructive",
        })
        return
      }

      // Salva o CEP e a localização no localStorage para uso posterior
      localStorage.setItem("userCep", cep)
      localStorage.setItem("userLocation", JSON.stringify(location))

      toast({
        title: "CEP encontrado",
        description: `Endereço encontrado: ${location.street}, ${location.neighborhood}, ${location.city}/${location.state}`,
      })

      if (onSearch) {
        onSearch(cep, location)
      }

      if (redirectToSearch) {
        router.push(`/search?cep=${cep}`)
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Ocorreu um erro ao buscar o endereço. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        placeholder="Digite seu CEP"
        value={cep}
        onChange={handleCepChange}
        onKeyDown={handleKeyDown}
        className="pl-4 pr-12 py-6 text-lg rounded-full"
        maxLength={9}
        disabled={isLoading}
      />
      <Button
        className="absolute right-1 top-1 rounded-full h-10"
        size="icon"
        onClick={handleSearch}
        disabled={isLoading}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Buscar</span>
      </Button>
    </div>
  )
}
