"use client"

import { useState } from "react"
import { Suspense } from "react"
import { ClientProvidersHeader } from "@/components/dashboard/client-providers-header"
import { ClientProvidersList } from "@/components/dashboard/client-providers-list"

interface Provider {
  id: string
  name: string
  service: string
  rating: number
  reviews: number
  location: string
  phone: string
  price: string
  image: string
  isFavorite: boolean
  completedJobs: number
  description: string
}

const mockProviders: Provider[] = [
  {
    id: "1",
    name: "Carlos Oliveira",
    service: "Encanador",
    rating: 4.9,
    reviews: 127,
    location: "São Paulo, SP",
    phone: "(11) 99999-1234",
    price: "R$ 80-120/hora",
    image: "/placeholder.svg?height=60&width=60",
    isFavorite: true,
    completedJobs: 245,
    description: "Especialista em instalações hidráulicas e reparos em geral",
  },
  {
    id: "2",
    name: "Maria Santos",
    service: "Eletricista",
    rating: 4.8,
    reviews: 89,
    location: "São Paulo, SP",
    phone: "(11) 99999-5678",
    price: "R$ 90-150/hora",
    image: "/placeholder.svg?height=60&width=60",
    isFavorite: false,
    completedJobs: 156,
    description: "Instalações elétricas residenciais e comerciais",
  },
  {
    id: "3",
    name: "Roberto Silva",
    service: "Pintor",
    rating: 4.7,
    reviews: 203,
    location: "São Paulo, SP",
    phone: "(11) 99999-9012",
    price: "R$ 60-100/hora",
    image: "/placeholder.svg?height=60&width=60",
    isFavorite: true,
    completedJobs: 312,
    description: "Pintura residencial e comercial, textura e acabamentos",
  },
  {
    id: "4",
    name: "Ana Costa",
    service: "Faxineira",
    rating: 4.9,
    reviews: 156,
    location: "São Paulo, SP",
    phone: "(11) 99999-3456",
    price: "R$ 40-80/hora",
    image: "/placeholder.svg?height=60&width=60",
    isFavorite: false,
    completedJobs: 189,
    description: "Limpeza residencial e pós-obra, organização de ambientes",
  },
  {
    id: "5",
    name: "Pedro Almeida",
    service: "Marceneiro",
    rating: 4.6,
    reviews: 78,
    location: "São Paulo, SP",
    phone: "(11) 99999-7890",
    price: "R$ 100-180/hora",
    image: "/placeholder.svg?height=60&width=60",
    isFavorite: false,
    completedJobs: 94,
    description: "Móveis sob medida, reparos em madeira e montagem",
  },
]

export default function ClientProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders)
  const [searchQuery, setSearchQuery] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const toggleFavorite = (providerId: string) => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === providerId ? { ...provider, isFavorite: !provider.isFavorite } : provider,
      ),
    )
  }

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.service.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesService = serviceFilter === "all" || provider.service.toLowerCase() === serviceFilter.toLowerCase()
    const matchesFavorites = !showFavoritesOnly || provider.isFavorite

    return matchesSearch && matchesService && matchesFavorites
  })

  const services = Array.from(new Set(providers.map((p) => p.service)))

  return (
    <div className="flex flex-col gap-6">
      <ClientProvidersHeader />

      <Suspense fallback={<div>Carregando profissionais...</div>}>
        <ClientProvidersList providers={filteredProviders} toggleFavorite={toggleFavorite} />
      </Suspense>
    </div>
  )
}
