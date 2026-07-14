"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Filter, MapPin, Shield } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CepSearch } from "@/components/cep-search"
import { findNearbyProviders } from "@/lib/cep-service"
import { toast } from "@/components/ui/use-toast"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [cep, setCep] = useState("")
  const [providers, setProviders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number>(0)
  const [maxDistance, setMaxDistance] = useState<number>(30)
  const [sortBy, setSortBy] = useState("relevance")
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)

  useEffect(() => {
    const cepParam = searchParams.get("cep")
    if (cepParam) {
      setCep(cepParam)
      searchProviders(cepParam)
    } else {
      // Tenta recuperar o CEP do localStorage
      const savedCep = localStorage.getItem("userCep")
      if (savedCep) {
        setCep(savedCep)
        searchProviders(savedCep)
      }
    }
  }, [searchParams])

  const searchProviders = async (searchCep: string) => {
    setIsLoading(true)
    try {
      const results = await findNearbyProviders(searchCep)
      setProviders(results)
    } catch (error) {
      toast({
        title: "Erro ao buscar profissionais",
        description: "Não foi possível encontrar profissionais próximos a este CEP.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const handleRatingChange = (rating: number) => {
    setMinRating(rating)
  }

  const handleDistanceChange = (value: number[]) => {
    setMaxDistance(value[0])
  }

  const handlePremiumChange = (checked: boolean) => {
    setShowPremiumOnly(checked)
  }

  const filteredProviders = providers
    .filter((provider) => {
      // Filtro por serviços
      if (selectedServices.length > 0) {
        const hasSelectedService = provider.services.some((service: string) => selectedServices.includes(service))
        if (!hasSelectedService) return false
      }

      // Filtro por avaliação
      if (provider.rating < minRating) return false

      // Filtro por distância
      const distance = Number.parseInt(provider.distance.split(" ")[0])
      if (distance > maxDistance) return false

      // Filtro por premium
      if (showPremiumOnly && !provider.isPremium) return false

      return true
    })
    .sort((a, b) => {
      // Ordenação
      if (sortBy === "relevance") {
        // Premium primeiro, depois por avaliação
        if (a.isPremium && !b.isPremium) return -1
        if (!a.isPremium && b.isPremium) return 1
        return b.rating - a.rating
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      } else if (sortBy === "distance") {
        return Number.parseInt(a.distance.split(" ")[0]) - Number.parseInt(b.distance.split(" ")[0])
      }
      return 0
    })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Buscar Profissionais</h1>
            <p className="text-muted-foreground">Encontre os melhores profissionais para o serviço que você precisa</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filtros */}
            <div className="w-full lg:w-64 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                      </h3>
                      <CepSearch redirectToSearch={false} onSearch={(searchCep) => searchProviders(searchCep)} />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Serviços</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="eletrica"
                            checked={selectedServices.includes("Elétrica")}
                            onCheckedChange={() => handleServiceChange("Elétrica")}
                          />
                          <label htmlFor="eletrica" className="text-sm">
                            Elétrica
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hidraulica"
                            checked={selectedServices.includes("Hidráulica")}
                            onCheckedChange={() => handleServiceChange("Hidráulica")}
                          />
                          <label htmlFor="hidraulica" className="text-sm">
                            Hidráulica
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="montagem"
                            checked={selectedServices.includes("Montagem de Móveis")}
                            onCheckedChange={() => handleServiceChange("Montagem de Móveis")}
                          />
                          <label htmlFor="montagem" className="text-sm">
                            Montagem de Móveis
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="reparos"
                            checked={selectedServices.includes("Reparos Gerais")}
                            onCheckedChange={() => handleServiceChange("Reparos Gerais")}
                          />
                          <label htmlFor="reparos" className="text-sm">
                            Reparos Gerais
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="instalacoes"
                            checked={selectedServices.includes("Instalações")}
                            onCheckedChange={() => handleServiceChange("Instalações")}
                          />
                          <label htmlFor="instalacoes" className="text-sm">
                            Instalações
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Avaliação</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="rating-4"
                            checked={minRating === 4}
                            onCheckedChange={(checked) => (checked ? handleRatingChange(4) : handleRatingChange(0))}
                          />
                          <label htmlFor="rating-4" className="text-sm flex items-center">
                            <span className="mr-1">4+</span>
                            <Star className="h-3 w-3 fill-primary text-primary" />
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="rating-3"
                            checked={minRating === 3}
                            onCheckedChange={(checked) => (checked ? handleRatingChange(3) : handleRatingChange(0))}
                          />
                          <label htmlFor="rating-3" className="text-sm flex items-center">
                            <span className="mr-1">3+</span>
                            <Star className="h-3 w-3 fill-primary text-primary" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Distância (km): {maxDistance}</h4>
                      <Slider
                        defaultValue={[maxDistance]}
                        max={50}
                        step={1}
                        className="my-4"
                        onValueChange={handleDistanceChange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0 km</span>
                        <span>50 km</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Tipo de Conta</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="premium"
                            checked={showPremiumOnly}
                            onCheckedChange={(checked) => handlePremiumChange(!!checked)}
                          />
                          <label htmlFor="premium" className="text-sm flex items-center">
                            Premium
                            <Shield className="h-3 w-3 ml-1 text-yellow-500" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" onClick={() => searchProviders(cep)} disabled={isLoading}>
                      Aplicar Filtros
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resultados */}
            <div className="flex-1">
              <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
                <Tabs defaultValue={sortBy} value={sortBy} onValueChange={setSortBy} className="w-full sm:w-auto">
                  <TabsList>
                    <TabsTrigger value="relevance">Relevância</TabsTrigger>
                    <TabsTrigger value="rating">Avaliação</TabsTrigger>
                    <TabsTrigger value="distance">Distância</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="text-sm text-muted-foreground">
                  Mostrando <span className="font-medium">{filteredProviders.length}</span> resultados
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <p>Buscando profissionais...</p>
                </div>
              ) : filteredProviders.length === 0 ? (
                <div className="text-center py-12">
                  <p>Nenhum profissional encontrado para os filtros selecionados.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedServices([])
                      setMinRating(0)
                      setMaxDistance(30)
                      setShowPremiumOnly(false)
                      searchProviders(cep)
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProviders.map((provider) => (
                    <Link href={`/provider/${provider.id}`} key={provider.id}>
                      <Card className="hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-lg">
                                  {provider.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {provider.isPremium && (
                                <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-0.5">
                                  <Shield className="h-3 w-3" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3 className="font-medium truncate">{provider.name}</h3>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                                  <span className="font-medium">{provider.rating}</span>
                                  <span className="text-muted-foreground text-sm ml-1">
                                    ({provider.reviewsCount} avaliações)
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mt-2">
                                {provider.services.map((service: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {service}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center mt-3 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>
                                  {provider.location} • {provider.distance}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
