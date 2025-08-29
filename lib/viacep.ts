/**
 * Serviço para integração com a API ViaCEP
 * Documentação: https://viacep.com.br/
 */

export interface ViaCepResponse {
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

export interface Address {
  cep: string
  street: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  coordinates?: {
    lat: number
    lng: number
  }
}

/**
 * Formata um CEP para o padrão 00000-000
 */
export function formatCep(cep: string): string {
  // Remove caracteres não numéricos
  const cleanCep = cep.replace(/\D/g, "")

  // Formata o CEP como 00000-000
  if (cleanCep.length === 8) {
    return cleanCep.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  return cleanCep
}

/**
 * Valida se um CEP está no formato correto
 */
export function validateCep(cep: string): boolean {
  const cleanCep = cep.replace(/\D/g, "")
  return cleanCep.length === 8
}

/**
 * Busca um endereço pelo CEP usando a API ViaCEP
 */
export async function fetchAddressByCep(cep: string): Promise<Address | null> {
  try {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, "")

    if (!validateCep(cleanCep)) {
      throw new Error("CEP inválido")
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    const data: ViaCepResponse = await response.json()

    if (data.erro) {
      throw new Error("CEP não encontrado")
    }

    return {
      cep: data.cep,
      street: data.logradouro,
      complement: data.complemento || undefined,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error)
    return null
  }
}

/**
 * Busca as coordenadas geográficas de um endereço
 * Nota: Em uma implementação real, você usaria uma API como Google Geocoding
 */
export async function getCoordinatesFromAddress(address: Address): Promise<{ lat: number; lng: number } | null> {
  try {
    // Simulação - em produção, use uma API real de geocodificação
    // como Google Maps Geocoding API ou Mapbox Geocoding API

    // Retorna coordenadas simuladas baseadas no CEP
    const cepNumbers = address.cep.replace(/\D/g, "")
    const lastDigits = cepNumbers.slice(-4)

    // Coordenadas simuladas para São Paulo
    const baseLat = -23.55
    const baseLng = -46.64

    // Adiciona uma pequena variação baseada no CEP
    const lat = baseLat + Number.parseInt(lastDigits.slice(0, 2)) / 1000
    const lng = baseLng + Number.parseInt(lastDigits.slice(2, 4)) / 1000

    return { lat, lng }
  } catch (error) {
    console.error("Erro ao obter coordenadas:", error)
    return null
  }
}

/**
 * Calcula a distância entre duas coordenadas usando a fórmula de Haversine
 * @returns Distância em quilômetros
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distância em km

  return Math.round(distance * 10) / 10 // Arredonda para 1 casa decimal
}

/**
 * Busca um endereço completo a partir de um CEP e adiciona coordenadas
 */
export async function getFullAddressFromCep(cep: string): Promise<Address | null> {
  try {
    const address = await fetchAddressByCep(cep)

    if (!address) {
      return null
    }

    // Adiciona coordenadas ao endereço
    const coordinates = await getCoordinatesFromAddress(address)

    if (coordinates) {
      address.coordinates = coordinates
    }

    return address
  } catch (error) {
    console.error("Erro ao obter endereço completo:", error)
    return null
  }
}
