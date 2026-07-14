import { Card, CardContent } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"

interface ClientReviewCardProps {
  id: string
  providerName: string
  providerId: string
  service: string
  date: string
  rating: number
  comment?: string
}

export function ClientReviewCard({
  id,
  providerName,
  providerId,
  service,
  date,
  rating,
  comment,
}: ClientReviewCardProps) {
  // Função para renderizar as estrelas
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Adicionar estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />)
    }

    // Adicionar meia estrela se necessário
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 text-primary" />)
    }

    // Adicionar estrelas vazias
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />)
    }

    return stars
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{providerName}</h3>
              <p className="text-sm text-muted-foreground">{service}</p>
            </div>
            <div className="flex items-center">
              {renderStars(rating)}
              <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">Data: {date}</p>

          {comment && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-sm">{comment}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
