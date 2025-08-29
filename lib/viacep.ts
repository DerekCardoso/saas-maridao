export interface Address {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export interface CepData {
  cep: string
  street: string
  complement: string
  neighborhood: string
  city: string
  state: string
  error?: boolean
}

export async function fetchAddressByCep(cep: string): Promise<Address | null> {
  try {
    const cleanCep = cep.replace(/\D/g, "")

    if (cleanCep.length !== 8) {
      throw new Error("CEP deve ter 8 dígitos")
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

    return {
      cep: address.cep,
      street: address.logradouro,
      complement: address.complemento,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
    }
  } catch (error) {
    console.error("Erro ao obter dados do CEP:", error)
    return null
  }
}

export function validateCep(cep: string): boolean {
  const cleanCep = cep.replace(/\D/g, "")
  return cleanCep.length === 8
}
