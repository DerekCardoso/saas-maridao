// Serviço para busca de CEP usando a API ViaCEP
export interface CepResponse {
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

export interface Location {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export async function fetchAddressByCep(cep: string): Promise<Location | null> {
  try {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, "")

    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido")
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
    const data: CepResponse = await response.json()

    if (data.erro) {
      throw new Error("CEP não encontrado")
    }

    return {
      cep: data.cep,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error)
    return null
  }
}

// Função para calcular distância entre dois CEPs (simulada)
export function calculateDistanceBetweenCeps(originCep: string, destinationCep: string): number {
  // Esta é uma função simulada que retornaria a distância em km
  // Em uma implementação real, você usaria as coordenadas geográficas e a fórmula de Haversine
  // ou uma API como Google Distance Matrix

  // Para fins de demonstração, retornamos um valor aleatório entre 1 e 20 km
  return Math.floor(Math.random() * 20) + 1
}

// Função para encontrar profissionais próximos a um CEP
export async function findNearbyProviders(cep: string, service?: string, maxDistance = 30) {
  // Em uma implementação real, esta função consultaria o banco de dados
  // para encontrar profissionais próximos ao CEP informado

  // Para fins de demonstração, retornamos dados simulados
  const location = await fetchAddressByCep(cep)

  if (!location) {
    return []
  }

  // Simulação de profissionais próximos
  return mockProviders.filter((provider) => {
    // Filtra por serviço se especificado
    if (service && !provider.services.includes(service)) {
      return false
    }

    // Calcula distância simulada
    const distance = calculateDistanceBetweenCeps(cep, provider.cep)
    provider.distance = `${distance} km`

    // Retorna apenas profissionais dentro da distância máxima
    return distance <= maxDistance
  })
}

// Dados simulados de profissionais
const mockProviders = [
  {
    id: "1",
    name: "João Silva",
    rating: 4.8,
    reviewsCount: 124,
    isPremium: true,
    services: ["Elétrica", "Instalações"],
    location: "São Paulo, SP",
    cep: "01310-100",
    distance: "",
    phone: "11999887766",
  },
  {
    id: "2",
    name: "Carlos Mendes",
    rating: 4.9,
    reviewsCount: 89,
    isPremium: false,
    services: ["Montagem de Móveis", "Reparos Gerais"],
    location: "São Paulo, SP",
    cep: "04538-132",
    distance: "",
    phone: "11988776655",
  },
  {
    id: "3",
    name: "Roberto Almeida",
    rating: 4.7,
    reviewsCount: 56,
    isPremium: true,
    services: ["Hidráulica", "Reparos Gerais"],
    location: "São Paulo, SP",
    cep: "05422-010",
    distance: "",
    phone: "11977665544",
  },
  {
    id: "4",
    name: "André Santos",
    rating: 4.5,
    reviewsCount: 42,
    isPremium: false,
    services: ["Elétrica", "Instalações"],
    location: "São Paulo, SP",
    cep: "02012-021",
    distance: "",
    phone: "11966554433",
  },
  {
    id: "5",
    name: "Marcos Oliveira",
    rating: 4.6,
    reviewsCount: 38,
    isPremium: false,
    services: ["Montagem de Móveis"],
    location: "São Paulo, SP",
    cep: "03087-010",
    distance: "",
    phone: "11955443322",
  },
]
