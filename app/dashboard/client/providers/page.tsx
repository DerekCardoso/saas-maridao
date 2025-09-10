"use client"

import { useState } from "react"
import { Search, Star, MapPin, Phone, MessageSquare, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export default function ProvidersPage() {
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profissionais</h1>
        <p className="text-muted-foreground">Encontre e gerencie seus prestadores de serviço favoritos</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou serviço..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por serviço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os serviços</SelectItem>
            {services.map((service) => (
              <SelectItem key={service} value={service.toLowerCase()}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="w-full sm:w-auto"
        >
          <Heart className={`h-4 w-4 mr-2 ${showFavoritesOnly ? "fill-current" : ""}`} />
          Favoritos
        </Button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">{filteredProviders.length} profissional(is) encontrado(s)</div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={provider.image || "/placeholder.svg"} />
                    <AvatarFallback>
                      {provider.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <CardDescription>{provider.service}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleFavorite(provider.id)} className="h-8 w-8 p-0">
                  <Heart className={`h-4 w-4 ${provider.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{provider.description}</p>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviews})</span>
                </div>
                <Badge variant="secondary">{provider.completedJobs} trabalhos</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{provider.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{provider.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-green-600">{provider.price}</span>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Contratar
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum profissional encontrado</p>
            <p className="text-sm">Tente ajustar os filtros de busca</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setServiceFilter("all")
              setShowFavoritesOnly(false)
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
