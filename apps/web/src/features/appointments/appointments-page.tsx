import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CalendarDays, Check, X } from "lucide-react"
import { toast } from "sonner"
import type { AppointmentStatus } from "@maridao/shared"
import { apiFetch } from "../../lib/api"
import { Button } from "../../components/ui/button"
import { EmptyState, ErrorState, LoadingState } from "../../components/ui/state"
import { useAuth } from "../auth/auth-context"

type Appointment = {
  id: string
  scheduled_for: string
  status: AppointmentStatus
  client_name: string
  provider_name: string
  service_name: string
  notes: string | null
  review_id: string | null
}

export function AppointmentsPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const appointments = useQuery({
    queryKey: ["appointments"],
    queryFn: () => apiFetch<Appointment[]>("/appointments/me")
  })
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: AppointmentStatus }) =>
      apiFetch(`/appointments/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      }),
    onSuccess: () => {
      toast.success("Agendamento atualizado.")
      void queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
    onError: (error: Error) => toast.error(error.message)
  })

  if (appointments.isLoading) return <LoadingState />
  if (appointments.isError) return <ErrorState message="Não foi possível carregar os agendamentos." />

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-black">{user?.role === "provider" ? "Minha agenda" : "Meus agendamentos"}</h1>
      <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200 bg-white">
        {appointments.data?.length === 0 ? (
          <EmptyState title="Agenda vazia" description="Seus próximos agendamentos aparecerão aqui." />
        ) : null}
        {appointments.data?.map((appointment) => (
          <article key={appointment.id} className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-brand-600" />
                <strong>{new Date(appointment.scheduled_for).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</strong>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {appointment.service_name} · {user?.role === "provider" ? appointment.client_name : appointment.provider_name}
              </p>
              <span className="mt-2 inline-block rounded bg-slate-100 px-2 py-1 text-xs font-semibold">{appointment.status}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.role === "provider" && appointment.status === "pending" ? (
                <Button onClick={() => statusMutation.mutate({ id: appointment.id, status: "confirmed" })}>
                  <Check className="size-4" /> Confirmar
                </Button>
              ) : null}
              {user?.role === "provider" && appointment.status === "confirmed" ? (
                <Button onClick={() => statusMutation.mutate({ id: appointment.id, status: "completed" })}>
                  Concluir
                </Button>
              ) : null}
              {appointment.status === "pending" || appointment.status === "confirmed" ? (
                <Button variant="outline" onClick={() => statusMutation.mutate({ id: appointment.id, status: "cancelled" })}>
                  <X className="size-4" /> Cancelar
                </Button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
