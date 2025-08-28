import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer">
      <CardHeader className="flex items-center justify-center pt-6">
        <div className="p-3 rounded-full bg-primary/10 text-primary">{icon}</div>
      </CardHeader>
      <CardContent className="text-center pt-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
