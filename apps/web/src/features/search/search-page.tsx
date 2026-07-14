import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { LocateFixed, Search } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import type { PaginatedResponse } from "@maridao/shared"
import { apiFetch } from "../../lib/api"
import { Button } from "../../components/ui/button"
import { Input, Select } from "../../components/ui/field"
import { EmptyState, ErrorState, LoadingState } from "../../components/ui/state"
import { ProviderCard, type ProviderCardData } from "../providers/provider-card"

type Category = { id: string; name: string; slug: string }

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get("query") ?? "")
  const [categoryId, setCategoryId] = useState(params.get("categoryId") ?? "")
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(() => {
    const latitude = Number(params.get("latitude"))
    const longitude = Number(params.get("longitude"))
    return Number.isFinite(latitude) && Number.isFinite(longitude) ? { latitude, longitude } : null
  })

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiFetch<Category[]>("/categories")
  })
  const search = useQuery({
    queryKey: ["providers", params.toString()],
    queryFn: () =>
      apiFetch<PaginatedResponse<ProviderCardData>>(`/providers/search?${params.toString()}`)
  })

  const submit = () => {
    const next = new URLSearchParams()
    if (query) next.set("query", query)
    if (categoryId) next.set("categoryId", categoryId)
    if (location) {
      next.set("latitude", String(location.latitude))
      next.set("longitude", String(location.longitude))
      next.set("radiusKm", "30")
    }
    setParams(next)
  }

  const locate = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const next = { latitude: coords.latitude, longitude: coords.longitude }
      setLocation(next)
      const updated = new URLSearchParams(params)
      updated.set("latitude", String(next.latitude))
      updated.set("longitude", String(next.longitude))
      updated.set("radiusKm", "30")
      setParams(updated)
    })
  }

  useEffect(() => {
    if (!params.has("page")) return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [params])

  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
            Encontre um profissional de confiança perto de você
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Compare serviços, reputação e distância. O contato e a negociação são diretos.
          </p>
          <div className="mt-7 grid gap-3 md:grid-cols-[1fr_240px_auto_auto]">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Qual serviço você precisa?"
              aria-label="Serviço"
            />
            <Select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              aria-label="Categoria"
            >
              <option value="">Todas as categorias</option>
              {categories.data?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Button variant="outline" onClick={locate}>
              <LocateFixed className="size-4" />
              {location ? "Localização ativa" : "Usar localização"}
            </Button>
            <Button onClick={submit}>
              <Search className="size-4" />
              Buscar
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">Profissionais disponíveis</h2>
            <p className="text-sm text-slate-500">
              {search.data?.pagination.total ?? 0} resultados encontrados
            </p>
          </div>
        </div>
        {search.isLoading ? <LoadingState label="Buscando profissionais..." /> : null}
        {search.isError ? <ErrorState message="Não foi possível realizar a busca." /> : null}
        {search.data?.data.length === 0 ? (
          <EmptyState
            title="Nenhum profissional encontrado"
            description="Tente ampliar o raio ou escolher outra categoria."
          />
        ) : null}
        <div>
          {search.data?.data.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>
    </main>
  )
}
