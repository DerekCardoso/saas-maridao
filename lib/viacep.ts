export interface Address {
  cep: string
  logradouro: string
  complemento?: string
  bairro: string
  localidade: string
  uf: string
}

export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export async function fetchAddressByCep(cep: string): Promise<ViaCepResponse | null> {
  try {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, "")

    // Verifica se o CEP tem 8 dígitos
    if (cleanCep.length !== 8) {
      throw new Error("CEP deve ter 8 dígitos")
    }

    console.log("Buscando CEP:", cleanCep)

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)

    if (!response.ok) {
      throw new Error("Erro ao buscar CEP")
    }

    const data: ViaCepResponse = await response.json()

    if (data.erro) {
      throw new Error("CEP não encontrado")
    }

    console.log("CEP encontrado:", data)
    return data
  } catch (error) {
    console.error("Erro ao buscar CEP:", error)
    return null
  }
}

// Função para formatar CEP
export function formatCep(cep: string): string {
  const cleanCep = cep.replace(/\D/g, "")
  return cleanCep.replace(/(\d{5})(\d{3})/, "$1-$2")
}

// Função para validar CEP
export function isValidCep(cep: string): boolean {
  const cleanCep = cep.replace(/\D/g, "")
  return cleanCep.length === 8
}

// Função para validar CEP (export que estava faltando)
export function validateCep(cep: string): { isValid: boolean; message?: string } {
  const cleanCep = cep.replace(/\D/g, "")

  if (!cleanCep) {
    return { isValid: false, message: "CEP é obrigatório" }
  }

  if (cleanCep.length !== 8) {
    return { isValid: false, message: "CEP deve ter 8 dígitos" }
  }

  // Verifica se não é um CEP com todos os dígitos iguais
  if (/^(\d)\1{7}$/.test(cleanCep)) {
    return { isValid: false, message: "CEP inválido" }
  }

  return { isValid: true }
}
