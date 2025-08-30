"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CepInput } from "@/components/cep-input"
import { fetchAddressByCep, type Address } from "@/lib/viacep"
import { Loader2 } from "lucide-react"

interface AddressFormProps {
  onAddressChange?: (address: Address) => void
  initialAddress?: Partial<Address>
  showSubmitButton?: boolean
  onSubmit?: (address: Address) => void
}

export function AddressForm({ onAddressChange, initialAddress, showSubmitButton = false, onSubmit }: AddressFormProps) {
  const [address, setAddress] = useState<Partial<Address>>({
    cep: "",
    street: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    ...initialAddress,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isManualInput, setIsManualInput] = useState(false)

  useEffect(() => {
    if (initialAddress) {
      setAddress((prev) => ({ ...prev, ...initialAddress }))
    }
  }, [initialAddress])

  const handleCepChange = async (cep: string, isValid: boolean) => {
    setAddress((prev) => ({ ...prev, cep }))

    if (!isValid) return
  }

  const handleCepBlur = async (cep: string, isValid: boolean) => {
    if (!isValid) return

    setIsLoading(true)

    try {
      const addressData = await fetchAddressByCep(cep)

      if (addressData) {
        const newAddress = {
          ...address,
          ...addressData,
        }

        setAddress(newAddress)

        if (onAddressChange) {
          onAddressChange(newAddress as Address)
        }
      } else {
        setIsManualInput(true)
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error)
      setIsManualInput(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof Address, value: string) => {
    setAddress((prev) => {
      const newAddress = { ...prev, [field]: value }

      if (onAddressChange && isAddressComplete(newAddress)) {
        onAddressChange(newAddress as Address)
      }

      return newAddress
    })
  }

  const isAddressComplete = (addr: Partial<Address>): boolean => {
    return !!(addr.cep && addr.street && addr.neighborhood && addr.city && addr.state)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (onSubmit && isAddressComplete(address)) {
      onSubmit(address as Address)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <div className="flex gap-2">
          <CepInput
            id="cep"
            placeholder="00000-000"
            value={address.cep}
            onChange={handleCepChange}
            onBlur={handleCepBlur}
            disabled={isLoading}
          />
          {isLoading && (
            <Button variant="ghost" size="icon" disabled>
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          )}
        </div>
        {isManualInput && (
          <p className="text-xs text-muted-foreground">
            CEP não encontrado. Por favor, preencha o endereço manualmente.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Rua</Label>
        <Input
          id="street"
          value={address.street || ""}
          onChange={(e) => handleInputChange("street", e.target.value)}
          disabled={isLoading && !isManualInput}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number">Número</Label>
          <Input
            id="number"
            placeholder="Número"
            onChange={(e) => handleInputChange("number" as any, e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>
          <Input
            id="complement"
            value={address.complement || ""}
            onChange={(e) => handleInputChange("complement", e.target.value)}
            disabled={isLoading && !isManualInput}
            placeholder="Opcional"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="neighborhood">Bairro</Label>
        <Input
          id="neighborhood"
          value={address.neighborhood || ""}
          onChange={(e) => handleInputChange("neighborhood", e.target.value)}
          disabled={isLoading && !isManualInput}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            value={address.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            disabled={isLoading && !isManualInput}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            value={address.state || ""}
            onChange={(e) => handleInputChange("state", e.target.value)}
            disabled={isLoading && !isManualInput}
            maxLength={2}
          />
        </div>
      </div>

      {showSubmitButton && (
        <Button type="submit" className="w-full" disabled={!isAddressComplete(address) || isLoading}>
          Salvar Endereço
        </Button>
      )}
    </form>
  )
}
