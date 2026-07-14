import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { apiFetch } from "../../lib/api"
import { formString } from "../../lib/form"
import { Button } from "../../components/ui/button"
import { Field, Input } from "../../components/ui/field"
import { LoadingState } from "../../components/ui/state"

const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

export function AvailabilityPage() {
  const queryClient = useQueryClient()
  const availability = useQuery({
    queryKey: ["availability"],
    queryFn: () =>
      apiFetch<{
        weekly: Array<{ weekday: number; start_time: string; end_time: string }>
        blocks: Array<{ id: string; starts_at: string; ends_at: string; reason?: string }>
      }>("/availability/me")
  })
  const [weekly, setWeekly] = useState(
    weekdays.slice(1, 6).map((_label, index) => ({
      weekday: index + 1,
      startTime: "08:00",
      endTime: "18:00",
      enabled: true
    }))
  )
  const save = useMutation({
    mutationFn: () =>
      apiFetch("/availability/me/weekly", {
        method: "PUT",
        body: JSON.stringify(
          weekly
            .filter((item) => item.enabled)
            .map(({ weekday, startTime, endTime }) => ({ weekday, startTime, endTime }))
        )
      }),
    onSuccess: () => toast.success("Disponibilidade atualizada.")
  })
  const block = useMutation({
    mutationFn: (body: object) =>
      apiFetch("/availability/me/blocks", { method: "POST", body: JSON.stringify(body) }),
    onSuccess: () => {
      toast.success("Horário bloqueado.")
      void queryClient.invalidateQueries({ queryKey: ["availability"] })
    }
  })

  if (availability.isLoading) return <LoadingState />

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-black">Disponibilidade</h1>
      <section className="mt-7 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-bold">Semana padrão</h2>
        <div className="mt-4 divide-y divide-slate-200">
          {weekly.map((item, index) => (
            <div key={item.weekday} className="grid gap-3 py-3 sm:grid-cols-[140px_1fr_1fr] sm:items-center">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={(event) =>
                    setWeekly((current) =>
                      current.map((value, currentIndex) =>
                        currentIndex === index ? { ...value, enabled: event.target.checked } : value
                      )
                    )
                  }
                />
                {weekdays[item.weekday]}
              </label>
              <Input
                type="time"
                value={item.startTime}
                disabled={!item.enabled}
                onChange={(event) =>
                  setWeekly((current) =>
                    current.map((value, currentIndex) =>
                      currentIndex === index ? { ...value, startTime: event.target.value } : value
                    )
                  )
                }
              />
              <Input
                type="time"
                value={item.endTime}
                disabled={!item.enabled}
                onChange={(event) =>
                  setWeekly((current) =>
                    current.map((value, currentIndex) =>
                      currentIndex === index ? { ...value, endTime: event.target.value } : value
                    )
                  )
                }
              />
            </div>
          ))}
        </div>
        <Button className="mt-4" onClick={() => save.mutate()}>Salvar semana</Button>
      </section>

      <section className="mt-6 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-bold">Bloquear período</h2>
        <form
          className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault()
            const form = new FormData(event.currentTarget)
            block.mutate({
              startsAt: new Date(formString(form, "startsAt")).toISOString(),
              endsAt: new Date(formString(form, "endsAt")).toISOString(),
              reason: formString(form, "reason")
            })
          }}
        >
          <Field label="Início"><Input name="startsAt" type="datetime-local" required /></Field>
          <Field label="Fim"><Input name="endsAt" type="datetime-local" required /></Field>
          <Field label="Motivo"><Input name="reason" /></Field>
          <Button className="self-end">Bloquear</Button>
        </form>
      </section>
    </main>
  )
}
