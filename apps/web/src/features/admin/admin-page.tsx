import { useState } from "react"
import type { ReactNode } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Ban, BadgeCheck, Check, Star } from "lucide-react"
import { toast } from "sonner"
import { apiFetch } from "../../lib/api"
import { Button } from "../../components/ui/button"
import { LoadingState } from "../../components/ui/state"

type Tab = "providers" | "users" | "reviews" | "billing"

export function AdminPage() {
  const [tab, setTab] = useState<Tab>("providers")
  const metrics = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: () => apiFetch<Record<string, number>>("/admin/metrics")
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-black">Administração</h1>
      <section className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(metrics.data ?? {}).map(([label, value]) => (
          <div key={label} className="border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">{label.replaceAll("_", " ")}</p>
            <p className="mt-2 text-2xl font-black">{value}</p>
          </div>
        ))}
      </section>
      <nav className="mt-8 flex gap-1 overflow-x-auto border-b border-slate-200">
        {(["providers", "users", "reviews", "billing"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`px-4 py-3 text-sm font-semibold ${tab === item ? "border-b-2 border-brand-600 text-brand-700" : "text-slate-500"}`}
          >
            {item}
          </button>
        ))}
      </nav>
      {tab === "providers" ? <ProvidersAdmin /> : null}
      {tab === "users" ? <UsersAdmin /> : null}
      {tab === "reviews" ? <ReviewsAdmin /> : null}
      {tab === "billing" ? <BillingAdmin /> : null}
    </main>
  )
}

function ProvidersAdmin() {
  const queryClient = useQueryClient()
  const providers = useQuery({
    queryKey: ["admin-providers"],
    queryFn: () => apiFetch<Array<{ id: string; display_name: string; email: string; status: string }>>("/admin/providers")
  })
  const moderate = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiFetch(`/admin/providers/${id}/moderation`, {
        method: "PATCH",
        body: JSON.stringify({ status, reason: status === "approved" ? "Perfil verificado" : "Revisão administrativa" })
      }),
    onSuccess: () => {
      toast.success("Prestador atualizado.")
      void queryClient.invalidateQueries({ queryKey: ["admin-providers"] })
    }
  })
  if (providers.isLoading) return <LoadingState />
  return (
    <AdminTable
      rows={providers.data ?? []}
      render={(provider) => (
        <>
          <div><strong>{provider.display_name}</strong><p className="text-sm text-slate-500">{provider.email}</p></div>
          <span>{provider.status}</span>
          <div className="flex gap-2">
            <Button onClick={() => moderate.mutate({ id: provider.id, status: "approved" })}><Check className="size-4" /> Aprovar</Button>
            <Button variant="danger" onClick={() => moderate.mutate({ id: provider.id, status: "suspended" })}>Suspender</Button>
          </div>
        </>
      )}
    />
  )
}

function UsersAdmin() {
  const queryClient = useQueryClient()
  const users = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => apiFetch<Array<{ id: string; name: string; email: string; role: string; is_blocked: boolean }>>("/admin/users")
  })
  const block = useMutation({
    mutationFn: ({ id, blocked }: { id: string; blocked: boolean }) =>
      apiFetch(`/admin/users/${id}/block`, {
        method: "PATCH",
        body: JSON.stringify({ blocked, reason: "Ação administrativa" })
      }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["admin-users"] })
  })
  return (
    <AdminTable
      rows={users.data ?? []}
      render={(user) => (
        <>
          <div><strong>{user.name}</strong><p className="text-sm text-slate-500">{user.email}</p></div>
          <span>{user.role}</span>
          <Button variant={user.is_blocked ? "outline" : "danger"} onClick={() => block.mutate({ id: user.id, blocked: !user.is_blocked })}>
            <Ban className="size-4" /> {user.is_blocked ? "Desbloquear" : "Bloquear"}
          </Button>
        </>
      )}
    />
  )
}

function ReviewsAdmin() {
  const queryClient = useQueryClient()
  const reviews = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => apiFetch<Array<{ id: string; client_name: string; provider_name: string; rating: number; comment: string; status: string }>>("/admin/reviews")
  })
  const moderate = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiFetch(`/admin/reviews/${id}/moderation`, {
        method: "PATCH",
        body: JSON.stringify({ status, reason: "Moderação administrativa" })
      }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["admin-reviews"] })
  })
  return (
    <AdminTable
      rows={reviews.data ?? []}
      render={(review) => (
        <>
          <div><strong>{review.client_name} → {review.provider_name}</strong><p className="text-sm text-slate-500">{review.comment}</p></div>
          <span className="flex items-center gap-1"><Star className="size-4" /> {review.rating}</span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => moderate.mutate({ id: review.id, status: "visible" })}>Exibir</Button>
            <Button variant="danger" onClick={() => moderate.mutate({ id: review.id, status: "hidden" })}>Ocultar</Button>
          </div>
        </>
      )}
    />
  )
}

function BillingAdmin() {
  const billing = useQuery({
    queryKey: ["admin-billing"],
    queryFn: () => apiFetch<Array<{ id: string; display_name: string; email: string; status: string }>>("/admin/subscriptions")
  })
  return (
    <AdminTable
      rows={billing.data ?? []}
      render={(subscription) => (
        <>
          <div><strong>{subscription.display_name}</strong><p className="text-sm text-slate-500">{subscription.email}</p></div>
          <span>{subscription.status}</span>
          <BadgeCheck className="size-5 text-amber-500" />
        </>
      )}
    />
  )
}

function AdminTable<T extends { id: string }>({ rows, render }: { rows: T[]; render: (row: T) => ReactNode }) {
  return (
    <div className="divide-y divide-slate-200 bg-white">
      {rows.map((row) => (
        <article key={row.id} className="grid gap-4 p-5 md:grid-cols-[1fr_160px_auto] md:items-center">
          {render(row)}
        </article>
      ))}
    </div>
  )
}
