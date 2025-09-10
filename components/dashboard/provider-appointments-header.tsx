"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"

export function ProviderAppointmentsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agendamentos</h1>
        <p className="text-muted-foreground">Gerencie todos os seus agendamentos e compromissos com clientes.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Gerenciar Disponibilidade
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>
    </div>
  )
}
