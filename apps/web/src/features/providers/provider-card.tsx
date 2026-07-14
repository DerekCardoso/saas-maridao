import { BadgeCheck, MapPin, MessageCircle, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { buildWhatsAppUrl } from "@maridao/shared"

export type ProviderCardData = {
  id: string
  displayName: string
  city: string
  state: string
  rating: number
  reviewCount: number
  isPremium: boolean
  basePriceCents: number | null
  distanceKm: number | null
  whatsapp?: string
  avatarUrl?: string | null
  categories: Array<{ id: string; name: string; slug: string }>
}

export function ProviderCard({ provider }: { provider: ProviderCardData }) {
  const whatsappUrl = provider.whatsapp
    ? buildWhatsAppUrl({
        phone: provider.whatsapp,
        clientName: "Cliente",
        serviceName: provider.categories[0]?.name ?? "serviço"
      })
    : `/providers/${provider.id}`

  return (
    <article className="grid gap-4 border-b border-slate-200 bg-white py-6 sm:grid-cols-[72px_1fr_auto] sm:items-center sm:px-5">
      <div className="grid size-16 place-items-center overflow-hidden rounded-full bg-brand-100 text-xl font-bold text-brand-700">
        {provider.avatarUrl ? (
          <img src={provider.avatarUrl} alt="" className="size-full object-cover" />
        ) : (
          provider.displayName.slice(0, 2).toUpperCase()
        )}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Link to={`/providers/${provider.id}`} className="text-lg font-bold hover:text-brand-700">
            {provider.displayName}
          </Link>
          {provider.isPremium ? (
            <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">
              <BadgeCheck className="size-3.5" />
              Premium
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-slate-600">
          {provider.categories.map((category) => category.name).join(" · ")}
        </p>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {provider.rating.toFixed(1)} ({provider.reviewCount})
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-4" />
            {provider.city}, {provider.state}
            {provider.distanceKm !== null ? ` · ${provider.distanceKm.toFixed(1)} km` : ""}
          </span>
        </div>
      </div>
      <div className="flex gap-2 sm:flex-col">
        <Link
          to={`/providers/${provider.id}`}
          className="flex min-h-10 flex-1 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-semibold"
        >
          Ver perfil
        </Link>
        <a
          href={whatsappUrl}
          target={provider.whatsapp ? "_blank" : undefined}
          rel="noreferrer"
          className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md bg-brand-600 px-4 text-sm font-semibold text-white"
          aria-label={`Falar com ${provider.displayName} no WhatsApp`}
        >
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
      </div>
    </article>
  )
}
