"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { fetchAddressByCep, validateCep, formatCep } from "@/lib/viacep"
import { Loader2, MapPin, AlertCircle } from "lucide-react"

interface AddressData {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  cep: string
}

interface AddressFormProps {
  onAddressChange: (address: AddressData) => void
  initialAddress?: Partial<AddressData>
}

export function AddressForm({ onAddressChange, initialAddress }: AddressFormProps) {
  const [cep, setCep] = useState(initialAddress?.cep || "")
  const [street, setStreet] = useState(initialAddress?.street || "")
  const [number, setNumber] = useState(initialAddress?.number || "")
  const [complement, setComplement] = useState(initialAddress?.complement || "")
  const [neighborhood, setNeighborhood] = useState(initialAddress?.neighborhood || "")
  const [city, setCity] = useState(initialAddress?.city || "")
  const [state, setState] = useState(initialAddress?.state || "")
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [cepError, setCepError] = useState("")

  // Update parent component when address changes
  useEffect(() => {
    if (street && neighborhood && city && state && cep) {
      onAddressChange({
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        cep: cep.replace(/\D/g, ""), // Remove formatting for storage
      })
    }
  }, [street, number, complement, neighborhood, city, state, cep, onAddressChange])

  const handleCepChange = (value: string) => {
    // Format CEP as user types
    const formatted = formatCep(value)
    setCep(formatted)
    setCepError("")

    // Auto-fetch address when CEP is complete
    const cleanCep = value.replace(/\D/g, "")
    if (cleanCep.length === 8) {
      fetchAddressFromCep(cleanCep)
    }
  }

  const fetchAddressFromCep = async (cepValue: string) => {
    if (!validateCep(cepValue)) {
      setCepError("CEP deve ter 8 dígitos")
      return
    }

    setIsLoadingCep(true)
    setCepError("")

    try {
      const address = await fetchAddressByCep(cepValue)

      if (address) {
        setStreet(address.logradouro || "")
        setNeighborhood(address.bairro || "")
        setCity(address.localidade || "")
        setState(address.uf || "")
      } else {
        setCepError("CEP não encontrado")
      }
    } catch (error) {
      setCepError("Erro ao buscar CEP")
      console.error("Erro ao buscar CEP:", error)
    } finally {
      setIsLoadingCep(false)
    }
  }

  const handleManualCepSearch = () => {
    const cleanCep = cep.replace(/\D/g, "")
    if (cleanCep.length === 8) {
      fetchAddressFromCep(cleanCep)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Endereço</h3>
      </div>

      {/* CEP Field */}
      <div className="space-y-2">
        <Label htmlFor="cep">CEP *</Label>
        <div className="flex gap-2">
          <Input
            id="cep"
            value={cep}
            onChange={(e) => handleCepChange(e.target.value)}
            placeholder="00000-000"
            maxLength={9}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleManualCepSearch}
            disabled={isLoadingCep || !validateCep(cep)}
          >
            {isLoadingCep ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
          </Button>
        </div>
        {cepError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{cepError}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Street Field */}
      <div className="space-y-2">
        <Label htmlFor="street">Logradouro *</Label>
        <Input
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Rua, Avenida, etc."
          required
        />
      </div>

      {/* Number and Complement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number">Número *</Label>
          <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="123" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>
          <Input
            id="complement"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            placeholder="Apto, Bloco, etc."
          />
        </div>
      </div>

      {/* Neighborhood Field */}
      <div className="space-y-2">
        <Label htmlFor="neighborhood">Bairro *</Label>
        <Input
          id="neighborhood"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          placeholder="Nome do bairro"
          required
        />
      </div>

      {/* City and State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="city">Cidade *</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Nome da cidade"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Estado *</Label>
          <Input
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
            placeholder="SP"
            maxLength={2}
            required
          />
        </div>
      </div>

      {isLoadingCep && (
        <Alert>
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertDescription>Buscando endereço...</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
