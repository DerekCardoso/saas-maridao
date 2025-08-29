export interface Address {
  cep: string
  logradouro: string
  complemento?: string
  bairro: string
  localidade: string
  uf: string
  ibge?: string
  gia?: string
  ddd?: string
  siafi?: string
  erro?: boolean
}

export interface CepData {
  cep: string
  street: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  ibge?: string
  gia?: string
  ddd?: string
  siafi?: string
}

export async function fetchAddressByCep(cep: string): Promise<Address | null> {
  try {
    // Remove any non-numeric characters from CEP
    const cleanCep = cep.replace(/\D/g, "")

    // Validate CEP format (8 digits)
    if (cleanCep.length !== 8) {
      console.error("CEP deve ter 8 dígitos")
      return null
    }

    console.log(`🔍 Buscando CEP: ${cleanCep}`)

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)

    if (!response.ok) {
      console.error("Erro na requisição para ViaCEP:", response.status)
      return null
    }

    const data: Address = await response.json()

    // Check if CEP was found
    if (data.erro) {
      console.error("CEP não encontrado")
      return null
    }

    console.log("✅ CEP encontrado:", data)
    return data
  } catch (error) {
    console.error("💥 Erro ao buscar CEP:", error)
    return null
  }
}

export async function getCepData(cep: string): Promise<CepData | null> {
  try {
    const address = await fetchAddressByCep(cep)

    if (!address) {
      return null
    }

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
    }
  } catch (error) {
    console.error("💥 Erro ao processar dados do CEP:", error)
    return null
  }
}

export function validateCep(cep: string): boolean {
  // Remove any non-numeric characters
  const cleanCep = cep.replace(/\D/g, "")

  // Check if it has exactly 8 digits
  return cleanCep.length === 8
}

export function formatCep(cep: string): string {
  // Remove any non-numeric characters
  const cleanCep = cep.replace(/\D/g, "")

  // Format as XXXXX-XXX
  if (cleanCep.length === 8) {
    return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`
  }

  return cep
}

export function cleanCep(cep: string): string {
  return cep.replace(/\D/g, "")
}
