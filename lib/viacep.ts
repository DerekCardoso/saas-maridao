export interface Address {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

export interface CepData {
  cep: string
  street: string
  complement: string
  neighborhood: string
  city: string
  state: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  error?: boolean
}

export async function fetchAddressByCep(cep: string): Promise<Address | null> {
  try {
    // Remove any non-numeric characters from CEP
    const cleanCep = cep.replace(/\D/g, "")

    // Validate CEP format (8 digits)
    if (cleanCep.length !== 8) {
      throw new Error("CEP deve conter 8 dígitos")
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)

    if (!response.ok) {
      throw new Error("Erro ao consultar CEP")
    }

    const data: Address = await response.json()

    if (data.erro) {
      throw new Error("CEP não encontrado")
    }

    return data
  } catch (error) {
    console.error("Erro ao buscar CEP:", error)
    return null
  }
}

export async function getCepData(cep: string): Promise<CepData | null> {
  try {
    const address = await fetchAddressByCep(cep)

    if (!address) {
      return null
    }

    // Convert ViaCEP format to our internal format
    return {
      cep: address.cep,
      street: address.logradouro,
      complement: address.complemento,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
      ibge: address.ibge,
      gia: address.gia,
      ddd: address.ddd,
      siafi: address.siafi,
      error: address.erro,
    }
  } catch (error) {
    console.error("Erro ao obter dados do CEP:", error)
    return null
  }
}

export function formatCep(cep: string): string {
  // Remove any non-numeric characters
  const cleanCep = cep.replace(/\D/g, "")

  // Format as XXXXX-XXX
  if (cleanCep.length === 8) {
    return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`
  }

  return cleanCep
}

export function validateCep(cep: string): boolean {
  const cleanCep = cep.replace(/\D/g, "")
  return cleanCep.length === 8
}

// Export all functions for compatibility
export { fetchAddressByCep as default }
