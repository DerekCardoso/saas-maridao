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

export async function fetchAddressByCep(cep: string): Promise<Address | null> {
  try {
    // Remove any non-numeric characters from CEP
    const cleanCep = cep.replace(/\D/g, "")

    if (cleanCep.length !== 8) {
      throw new Error("CEP deve ter 8 dígitos")
    }

    console.log("🔍 Buscando CEP:", cleanCep)

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)

    if (!response.ok) {
      throw new Error("Erro ao consultar CEP")
    }

    const data: Address = await response.json()

    if (data.erro) {
      throw new Error("CEP não encontrado")
    }

    console.log("✅ CEP encontrado:", data)
    return data
  } catch (error) {
    console.error("❌ Erro ao buscar CEP:", error)
    return null
  }
}

export async function getCepData(cep: string): Promise<Address | null> {
  return fetchAddressByCep(cep)
}

export function validateCep(cep: string): boolean {
  const cleanCep = cep.replace(/\D/g, "")
  return cleanCep.length === 8
}

export function formatCep(cep: string): string {
  const cleanCep = cep.replace(/\D/g, "")
  if (cleanCep.length === 8) {
    return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`
  }
  return cep
}
