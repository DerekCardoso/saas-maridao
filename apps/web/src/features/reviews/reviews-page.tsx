import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Star } from "lucide-react"
import { toast } from "sonner"
import { apiFetch } from "../../lib/api"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/field"
import { EmptyState, LoadingState } from "../../components/ui/state"

type Appointment = {
  id: string
  provider_name: string
  service_name: string
  status: string
  review_id: string | null
}

export function ReviewsPage() {
  const queryClient = useQueryClient()
  const [draft, setDraft] = useState<Record<string, { rating: number; comment: string }>>({})
  const appointments = useQuery({
    queryKey: ["appointments"],
    queryFn: () => apiFetch<Appointment[]>("/appointments/me")
  })
  const mutation = useMutation({
    mutationFn: (body: object) => apiFetch("/reviews", { method: "POST", body: JSON.stringify(body) }),
    onSuccess: () => {
      toast.success("Avaliação publicada.")
      void queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
    onError: (error: Error) => toast.error(error.message)
  })

  if (appointments.isLoading) return <LoadingState />
  const reviewable = appointments.data?.filter((item) => item.status === "completed" && !item.review_id) ?? []

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-black">Avaliações pendentes</h1>
      <div className="mt-7 grid gap-5">
        {reviewable.length === 0 ? <EmptyState title="Tudo avaliado" description="Não há serviços aguardando avaliação." /> : null}
        {reviewable.map((appointment) => {
          const value = draft[appointment.id] ?? { rating: 0, comment: "" }
          return (
            <article key={appointment.id} className="border border-slate-200 bg-white p-6">
              <h2 className="font-bold">{appointment.provider_name}</h2>
              <p className="text-sm text-slate-500">{appointment.service_name}</p>
              <div className="my-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    aria-label={`${rating} estrelas`}
                    onClick={() => setDraft((current) => ({ ...current, [appointment.id]: { ...value, rating } }))}
                  >
                    <Star className={`size-7 ${rating <= value.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                  </button>
                ))}
              </div>
              <Textarea
                value={value.comment}
                onChange={(event) => setDraft((current) => ({ ...current, [appointment.id]: { ...value, comment: event.target.value } }))}
                placeholder="Conte como foi sua experiência"
              />
              <Button
                className="mt-4"
                disabled={value.rating === 0 || mutation.isPending}
                onClick={() => mutation.mutate({ appointmentId: appointment.id, ...value })}
              >
                Publicar avaliação
              </Button>
            </article>
          )
        })}
      </div>
    </main>
  )
}
