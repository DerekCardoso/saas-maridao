import { useState, type FormEvent } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { BadgeCheck, CalendarDays, MapPin, MessageCircle, Star } from "lucide-react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { buildWhatsAppUrl } from "@maridao/shared"
import { apiFetch } from "../../lib/api"
import { formString } from "../../lib/form"
import { Button } from "../../components/ui/button"
import { Field, Input, Select, Textarea } from "../../components/ui/field"
import { ErrorState, LoadingState } from "../../components/ui/state"
import { useAuth } from "../auth/auth-context"

type Provider = {
  id: string
  display_name: string
  whatsapp: string
  bio: string | null
  base_price_cents: number | null
  city: string
  state: string
  rating: number
  review_count: number
  is_premium: boolean
  categories: Array<{ id: string; name: string }>
}

export function ProviderPage() {
  const { id = "" } = useParams()
  const { user } = useAuth()
  const [showSchedule, setShowSchedule] = useState(false)
  const provider = useQuery({
    queryKey: ["provider", id],
    queryFn: () => apiFetch<Provider>(`/providers/${id}`)
  })
  const reviews = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => apiFetch<Array<{ id: string; rating: number; comment: string; client_name: string }>>(`/reviews/provider/${id}`)
  })

  if (provider.isLoading) return <LoadingState />
  if (!provider.data || provider.isError) return <ErrorState message="Profissional não encontrado." />

  const data = provider.data
  const whatsapp = buildWhatsAppUrl({
    phone: data.whatsapp,
    clientName: user?.name ?? "Cliente",
    serviceName: data.categories[0]?.name ?? "serviço"
  })

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black">{data.display_name}</h1>
            {data.is_premium ? (
              <span className="flex items-center gap-1 rounded bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">
                <BadgeCheck className="size-4" /> Premium
              </span>
            ) : null}
          </div>
          <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {data.rating.toFixed(1)} ({data.review_count} avaliações)
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-4" />
              {data.city}, {data.state}
            </span>
          </div>
          <p className="mt-6 max-w-3xl leading-7 text-slate-700">{data.bio}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {data.categories.map((category) => (
              <span key={category.id} className="rounded bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700">
                {category.name}
              </span>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold">Avaliações</h2>
            <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
              {reviews.data?.map((review) => (
                <article key={review.id} className="py-5">
                  <div className="flex items-center justify-between">
                    <strong>{review.client_name}</strong>
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      {review.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm text-slate-500">Preço base</p>
          <p className="mt-1 text-2xl font-black">
            {data.base_price_cents ? `R$ ${(data.base_price_cents / 100).toFixed(2)}` : "Sob consulta"}
          </p>
          <div className="mt-6 grid gap-3">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-600 px-4 text-sm font-bold text-white">
              <MessageCircle className="size-5" />
              Conversar no WhatsApp
            </a>
            <Button variant="outline" onClick={() => setShowSchedule((value) => !value)}>
              <CalendarDays className="size-5" />
              Solicitar agendamento
            </Button>
          </div>
          {showSchedule ? <ScheduleForm providerId={id} categories={data.categories} /> : null}
        </aside>
      </section>
    </main>
  )
}

function ScheduleForm({ providerId, categories }: { providerId: string; categories: Array<{ id: string; name: string }> }) {
  const [date, setDate] = useState("")
  const slots = useQuery({
    queryKey: ["slots", providerId, date],
    enabled: Boolean(date),
    queryFn: () => apiFetch<string[]>(`/availability/${providerId}/slots?date=${date}`)
  })
  const mutation = useMutation({
    mutationFn: (body: object) =>
      apiFetch("/appointments", { method: "POST", body: JSON.stringify(body) }),
    onSuccess: () => toast.success("Agendamento solicitado."),
    onError: (error: Error) => toast.error(error.message)
  })
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    mutation.mutate({
      providerId,
      serviceCategoryId: formString(form, "category"),
      scheduledFor: formString(form, "slot"),
      notes: formString(form, "notes")
    })
  }
  return (
    <form onSubmit={submit} className="mt-6 grid gap-3 border-t border-slate-200 pt-5">
      <Field label="Serviço">
        <Select name="category" required>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </Select>
      </Field>
      <Field label="Data">
        <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
      </Field>
      <Field label="Horário">
        <Select name="slot" required>
          <option value="">Selecione</option>
          {slots.data?.map((slot) => <option key={slot} value={slot}>{new Date(slot).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" })}</option>)}
        </Select>
      </Field>
      <Field label="Observações">
        <Textarea name="notes" />
      </Field>
      <Button disabled={mutation.isPending}>Confirmar solicitação</Button>
    </form>
  )
}
