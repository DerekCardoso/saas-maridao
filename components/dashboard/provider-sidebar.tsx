"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Clock, CreditCard, Home, MessageSquare, Settings, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function ProviderSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard/provider" className="flex items-center gap-2 font-semibold">
          <span className="text-primary">Maridão</span>
          <span className="text-muted-foreground">Prestador</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/dashboard/provider"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/provider" && "bg-muted text-foreground",
            )}
          >
            <Home className="h-4 w-4" />
            Início
          </Link>
          <Link
            href="/dashboard/provider/appointments"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/provider/appointments" && "bg-muted text-foreground",
            )}
          >
            <Calendar className="h-4 w-4" />
            Agendamentos
          </Link>
          <Link
            href="/dashboard/provider/history"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/provider/history" && "bg-muted text-foreground",
            )}
          >
            <Clock className="h-4 w-4" />
            Histórico
          </Link>
          <Link
            href="/dashboard/provider/messages"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname.startsWith("/dashboard/provider/messages") && "bg-muted text-foreground",
            )}
          >
            <MessageSquare className="h-4 w-4" />
            Mensagens
          </Link>
          <Link
            href="/dashboard/provider/reviews"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/provider/reviews" && "bg-muted text-foreground",
            )}
          >
            <Star className="h-4 w-4" />
            Avaliações
          </Link>
          <Link
            href="/dashboard/provider/settings/premium"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/provider/settings/premium" && "bg-muted text-foreground",
            )}
          >
            <CreditCard className="h-4 w-4" />
            Plano Premium
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard/provider/settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Link>
        </Button>
      </div>
    </div>
  )
}
