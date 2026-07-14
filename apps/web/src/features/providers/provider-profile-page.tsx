import type { FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { apiFetch } from "../../lib/api"
import { formString, formStringArray } from "../../lib/form"
import { Button } from "../../components/ui/button"
import { Field, Input, Select, Textarea } from "../../components/ui/field"
import { LoadingState } from "../../components/ui/state"

type Category = { id: string; name: string }
type ProviderProfile = {
  display_name: string
  whatsapp: string
  bio: string
  base_price_cents: number | null
  cep: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  work_radius_km: number
  status: string
  moderation_reason?: string
  categories: Category[]
}

export function ProviderProfilePage() {
  const queryClient = useQueryClient()
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiFetch<Category[]>("/categories")
  })
  const profile = useQuery({
    queryKey: ["provider-profile"],
    queryFn: () => apiFetch<ProviderProfile>("/providers/me"),
    retry: false
  })
  const mutation = useMutation({
    mutationFn: (body: object) =>
      apiFetch("/providers/me", { method: "PATCH", body: JSON.stringify(body) }),
    onSuccess: () => {
      toast.success("Perfil enviado para aprovação.")
      void queryClient.invalidateQueries({ queryKey: ["provider-profile"] })
    },
    onError: (error: Error) => toast.error(error.message)
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    mutation.mutate({
      displayName: formString(form, "displayName"),
      whatsapp: formString(form, "whatsapp"),
      bio: formString(form, "bio"),
      basePriceCents: Number(formString(form, "basePrice")) * 100,
      cep: formString(form, "cep"),
      street: formString(form, "street"),
      number: formString(form, "number"),
      neighborhood: formString(form, "neighborhood"),
      city: formString(form, "city"),
      state: formString(form, "state"),
      workRadiusKm: Number(formString(form, "workRadiusKm")),
      serviceCategoryIds: formStringArray(form, "serviceCategoryIds")
    })
  }

  if (profile.isLoading || categories.isLoading) return <LoadingState />

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-7">
        <h1 className="text-3xl font-black">Perfil profissional</h1>
        <p className="mt-2 text-slate-600">Complete sua oferta para entrar na busca do Maridão.</p>
      </div>
      {profile.data?.status ? (
        <div className="mb-6 border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm">
          Status: <strong>{profile.data.status}</strong>
          {profile.data.moderation_reason ? ` · ${profile.data.moderation_reason}` : ""}
        </div>
      ) : null}
      <form onSubmit={submit} className="grid gap-6 bg-white p-6 shadow-soft md:grid-cols-2">
        <Field label="Nome profissional">
          <Input name="displayName" defaultValue={profile.data?.display_name} required />
        </Field>
        <Field label="WhatsApp">
          <Input name="whatsapp" defaultValue={profile.data?.whatsapp} required />
        </Field>
        <Field label="Preço base (R$)">
          <Input name="basePrice" type="number" min="0" step="0.01" defaultValue={(profile.data?.base_price_cents ?? 0) / 100} />
        </Field>
        <Field label="Raio de atendimento">
          <Select name="workRadiusKm" defaultValue={profile.data?.work_radius_km ?? 20}>
            {[10, 20, 30, 50, 100].map((value) => <option key={value} value={value}>{value} km</option>)}
          </Select>
        </Field>
        <div className="md:col-span-2">
          <Field label="Descrição">
            <Textarea name="bio" defaultValue={profile.data?.bio} required />
          </Field>
        </div>
        <Field label="CEP"><Input name="cep" defaultValue={profile.data?.cep} required /></Field>
        <Field label="Rua"><Input name="street" defaultValue={profile.data?.street} required /></Field>
        <Field label="Número"><Input name="number" defaultValue={profile.data?.number} required /></Field>
        <Field label="Bairro"><Input name="neighborhood" defaultValue={profile.data?.neighborhood} required /></Field>
        <Field label="Cidade"><Input name="city" defaultValue={profile.data?.city} required /></Field>
        <Field label="UF"><Input name="state" maxLength={2} defaultValue={profile.data?.state} required /></Field>
        <fieldset className="md:col-span-2">
          <legend className="mb-3 text-sm font-medium text-slate-700">Serviços oferecidos</legend>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {categories.data?.map((category) => (
              <label key={category.id} className="flex items-center gap-2 border border-slate-200 p-3 text-sm">
                <input
                  name="serviceCategoryIds"
                  value={category.id}
                  type="checkbox"
                  defaultChecked={profile.data?.categories.some((item) => item.id === category.id)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="md:col-span-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Salvando..." : "Salvar e enviar para aprovação"}
          </Button>
        </div>
      </form>
    </main>
  )
}
