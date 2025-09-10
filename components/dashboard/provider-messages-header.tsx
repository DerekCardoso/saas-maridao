"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ProviderMessagesHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
        <p className="text-muted-foreground">Gerencie suas conversas com clientes e responda rapidamente.</p>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Buscar conversas..." className="pl-8" />
      </div>
    </div>
  )
}
