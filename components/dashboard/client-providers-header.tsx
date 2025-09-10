"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ClientProvidersHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profissionais</h1>
        <p className="text-muted-foreground">Encontre e contrate os melhores profissionais da sua região</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome ou serviço..." className="pl-10" />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            <SelectItem value="hidraulica">Hidráulica</SelectItem>
            <SelectItem value="eletrica">Elétrica</SelectItem>
            <SelectItem value="limpeza">Limpeza</SelectItem>
            <SelectItem value="jardinagem">Jardinagem</SelectItem>
            <SelectItem value="pintura">Pintura</SelectItem>
            <SelectItem value="marcenaria">Marcenaria</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
