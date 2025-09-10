"use client"

import { useState, useEffect } from "react"
import { Heart, MessageCircle, Star, MapPin, Clock, Shield } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Provider {
  id: string
  name: string
  service: string
  category: string
  rating: number
  reviewCount: number
  price: string
  location: string
  distance: string
  avatar: string
  verified: boolean
  premium: boolean
  description: string
  services: string[]
  availability: string
}

export function ClientProvidersList() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/providers")

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        setProviders(data)
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error)
        setError(error instanceof Error ? error.message : "Erro desconhecido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProviders()
  }, [])

  const toggleFavorite = (providerId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(providerId)) {
        newFavorites.delete(providerId)
      } else {
        newFavorites.add(providerId)
      }
      return newFavorites
    })
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-muted animate-pulse rounded-full" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-3 w-full bg-muted animate-pulse rounded" />
                <div className="h-3 w-3/4 bg-muted animate-pulse rounded" />
                <div className="flex justify-between items-center">
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                  <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <p>Erro ao carregar profissionais: {error}</p>
            <button onClick={() => window.location.reload()} className="mt-2 text-primary hover:underline">
              Tentar novamente
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <Card key={provider.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={provider.name} />
                  <AvatarFallback>
                    {provider.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{provider.name}</h3>
                    {provider.verified && <Shield className="h-4 w-4 text-blue-500" />}
                    {provider.premium && (
                      <Badge variant="secondary" className="text-xs">
                        PRO
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{provider.service}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => toggleFavorite(provider.id)} className="p-1">
                <Heart
                  className={`h-4 w-4 ${
                    favorites.has(provider.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{provider.rating}</span>
                <span>({provider.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{provider.distance}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{provider.description}</p>

            <div className="flex flex-wrap gap-1">
              {provider.services.slice(0, 3).map((service) => (
                <Badge key={service} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{provider.availability}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm">
                <span className="font-semibold">{provider.price}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </Button>
                <Button size="sm">Contratar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
