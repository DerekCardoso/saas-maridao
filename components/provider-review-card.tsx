import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface ProviderReviewCardProps {
  author: string
  rating: number
  date: string
  comment: string
  service: string
}

export function ProviderReviewCard({ author, rating, date, comment, service }: ProviderReviewCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{author}</h3>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">Serviço: {service}</p>
          <p className="mt-2">{comment}</p>
        </div>
      </CardContent>
    </Card>
  )
}
