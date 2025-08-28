import { Star } from "lucide-react"

export function ProviderReviewsHeader() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <Star className="h-6 w-6 text-yellow-500" />
        Avaliações
      </h1>
      <p className="text-muted-foreground">Veja o que seus clientes estão dizendo sobre seus serviços</p>
    </div>
  )
}
