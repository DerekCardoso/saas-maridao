import { useMutation, useQuery } from "@tanstack/react-query"
import { BadgeCheck, Check } from "lucide-react"
import { apiFetch } from "../../lib/api"
import { Button } from "../../components/ui/button"
import { LoadingState } from "../../components/ui/state"

export function PremiumPage() {
  const subscription = useQuery({
    queryKey: ["subscription"],
    queryFn: () => apiFetch<{ status: string; current_period_end?: string }>("/billing/me")
  })
  const checkout = useMutation({
    mutationFn: () =>
      apiFetch<{ url: string }>("/billing/checkout", {
        method: "POST",
        body: JSON.stringify({ successPath: "/provider/premium", cancelPath: "/provider/premium" })
      }),
    onSuccess: ({ url }) => {
      window.location.href = url
    }
  })
  const portal = useMutation({
    mutationFn: () => apiFetch<{ url: string }>("/billing/portal", { method: "POST" }),
    onSuccess: ({ url }) => {
      window.location.href = url
    }
  })

  if (subscription.isLoading) return <LoadingState />
  const active = ["active", "trialing"].includes(subscription.data?.status ?? "")

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
        <section>
          <BadgeCheck className="size-10 text-amber-500" />
          <h1 className="mt-4 text-4xl font-black">Maridão Premium</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Mais visibilidade para profissionais que querem receber novas oportunidades.
          </p>
          <ul className="mt-8 grid gap-4 text-slate-700">
            {["Prioridade nos resultados", "Selo Premium no perfil", "Maior destaque para clientes locais"].map((item) => (
              <li key={item} className="flex items-center gap-3"><Check className="size-5 text-brand-600" />{item}</li>
            ))}
          </ul>
        </section>
        <aside className="border border-slate-200 bg-white p-7 shadow-soft">
          <p className="text-sm text-slate-500">Assinatura mensal</p>
          <p className="mt-1 text-3xl font-black">R$ 49,90</p>
          <p className="mt-4 text-sm text-slate-600">Status atual: <strong>{subscription.data?.status ?? "inactive"}</strong></p>
          {active ? (
            <Button className="mt-6 w-full" variant="outline" onClick={() => portal.mutate()}>Gerenciar assinatura</Button>
          ) : (
            <Button className="mt-6 w-full" onClick={() => checkout.mutate()}>Assinar Premium</Button>
          )}
        </aside>
      </div>
    </main>
  )
}
