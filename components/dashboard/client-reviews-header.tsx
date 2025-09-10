"use client"

import { Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ClientReviewsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Avaliações</h1>
        <p className="text-muted-foreground">Suas avaliações e feedback sobre os serviços contratados</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Button>
          <Star className="mr-2 h-4 w-4" />
          Avaliar Serviço
        </Button>
      </div>
    </div>
  )
}
