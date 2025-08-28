import prisma from "../db"
import type { Provider } from "../mock-data"
import { getProviderById as getProviderByIdFromDb, getProviders, getProvidersByCategory } from "../db"

export interface ProviderSearchParams {
  cep?: string
  specialty?: string
  minRating?: number
  maxDistance?: number
  isPremium?: boolean
  page?: number
  limit?: number
}

export interface ProviderResponse {
  id: string
  userId: string
  name: string
  phone: string
  isPremium: boolean
  rating: number
  reviewsCount: number
  specialties: string[]
  location: string | null
  distance: string | null
  bio?: string | null
  reviews?: {
    id: string
    rating: number
    comment: string | null
    author: string
    date: Date
  }[]
}

export async function searchProviders(params: ProviderSearchParams): Promise<{
  providers: ProviderResponse[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}> {
  const { specialty, minRating, isPremium, page = 1, limit = 10, cep, maxDistance = 30 } = params

  const skip = (page - 1) * limit

  // Construir a query base
  const query: any = {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          addresses: true,
        },
      },
      specialties: true,
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          client: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },
    take: limit,
    skip: skip,
  }

  // Filtros
  const where: any = {}

  // Filtro por especialidade
  if (specialty) {
    where.specialties = {
      some: {
        name: {
          contains: specialty,
          mode: "insensitive",
        },
      },
    }
  }

  // Filtro por avaliação mínima
  if (minRating !== undefined) {
    where.rating = {
      gte: minRating,
    }
  }

  // Filtro por premium
  if (isPremium) {
    where.isPremium = true
  }

  query.where = where

  // Ordenação
  // Premium primeiro, depois por avaliação
  query.orderBy = [{ isPremium: "desc" }, { rating: "desc" }]

  // Executa a query
  const providers = await prisma.provider.findMany(query)
  const total = await prisma.provider.count({ where })

  // Filtra por distância se o CEP for fornecido
  // Nota: Em uma implementação real, você usaria geolocalização
  let filteredProviders = providers

  if (cep) {
    // Simulação de filtragem por distância
    // Em uma implementação real, você calcularia a distância real
    filteredProviders = providers
      .map((provider) => {
        // Simula uma distância aleatória entre 1 e 50 km
        const distance = Math.floor(Math.random() * 50) + 1

        return {
          ...provider,
          distance: `${distance} km`,
        }
      })
      .filter((provider) => {
        const distance = Number.parseInt(provider.distance.split(" ")[0])
        return distance <= maxDistance
      })
  }

  // Formata os dados para a resposta
  const formattedProviders = filteredProviders.map((provider) => {
    const address = provider.user.addresses[0] || null

    return {
      id: provider.id,
      userId: provider.user.id,
      name: provider.user.name,
      phone: provider.user.phone,
      isPremium: provider.isPremium,
      rating: provider.rating,
      reviewsCount: provider._count?.reviews || 0,
      specialties: provider.specialties.map((s) => s.name),
      location: address ? `${address.city}, ${address.state}` : null,
      distance: provider.distance || null,
      bio: provider.bio,
      reviews: provider.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        author: review.client.user.name,
        date: review.createdAt,
      })),
    }
  })

  return {
    providers: formattedProviders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export async function getProviderById(id: string): Promise<ProviderResponse | null> {
  const provider = await getProviderByIdFromDb(id)

  if (!provider) {
    return null
  }

  const address = provider.user.addresses[0] || null

  return {
    id: provider.id,
    userId: provider.user.id,
    name: provider.user.name,
    phone: provider.user.phone,
    isPremium: provider.isPremium,
    rating: provider.rating,
    reviewsCount: provider._count?.reviews || 0,
    specialties: provider.specialties.map((s) => s.name),
    location: address ? `${address.city}, ${address.state}` : null,
    distance: null,
    bio: provider.bio,
    reviews: provider.reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      author: review.client.user.name,
      date: review.createdAt,
    })),
  }
}

export async function getAllProvidersService(): Promise<Provider[]> {
  return getProviders()
}

export async function getProvidersByCategoryService(categoryId: string): Promise<Provider[]> {
  return getProvidersByCategory(categoryId)
}

export async function createProviderService(providerData: Omit<Provider, "id">): Promise<Provider> {
  // Simulando criação de prestador com dados mockados
  const newProvider: Provider = {
    id: `provider-${Date.now()}`,
    ...providerData,
  }
  return newProvider
}

export async function updateProviderService(id: string, providerData: Partial<Provider>): Promise<Provider | null> {
  const provider = await getProviderById(id)
  if (!provider) return null

  // Simulando atualização de prestador com dados mockados
  return {
    ...provider,
    ...providerData,
  }
}

export async function deleteProviderService(id: string): Promise<boolean> {
  // Simulando exclusão de prestador
  return true
}
