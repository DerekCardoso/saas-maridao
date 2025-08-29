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
}

export async function fetchAddressByCep(cep: string): Promise<Address | null> {
  try {
    // Remove any non-numeric characters
    const cleanCep = cep.replace(/\D/g, "")

    // Validate CEP format
    if (cleanCep.length !== 8) {
      throw new Error("CEP deve ter 8 dígitos")
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)

    if (!response.ok) {
      throw new Error("Erro ao buscar CEP")
    }

    const data = await response.json()

    if (data.erro) {
      throw new Error("CEP não encontrado")
    }

    return data
  } catch (error) {
    console.error("Erro ao buscar CEP:", error)
    return null
  }
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
