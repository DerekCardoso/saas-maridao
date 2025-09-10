"use client"

import { Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ClientAppointmentsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agendamentos</h1>
        <p className="text-muted-foreground">Gerencie todos os seus agendamentos de serviços</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>
    </div>
  )
}
