"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Database, Home, Settings, Users, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoutButton } from "../auth/logout-button"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard/admin" className="flex items-center gap-2 font-semibold">
          <span className="text-primary">Maridão</span>
          <span className="text-muted-foreground">Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/dashboard/admin"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/admin" && "bg-muted text-foreground",
            )}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/admin/users"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/admin/users" && "bg-muted text-foreground",
            )}
          >
            <Users className="h-4 w-4" />
            Usuários
          </Link>
          <Link
            href="/dashboard/admin/appointments"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/admin/appointments" && "bg-muted text-foreground",
            )}
          >
            <Calendar className="h-4 w-4" />
            Agendamentos
          </Link>
          <Link
            href="/dashboard/admin/reports"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/admin/reports" && "bg-muted text-foreground",
            )}
          >
            <BarChart className="h-4 w-4" />
            Relatórios
          </Link>
          <Link
            href="/dashboard/admin/database"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/admin/database" && "bg-muted text-foreground",
            )}
          >
            <Database className="h-4 w-4" />
            Banco de Dados
          </Link>
          <Link
            href="/dashboard/admin/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
              pathname === "/dashboard/admin/settings" && "bg-muted text-foreground",
            )}
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <LogoutButton className="w-full justify-start" variant="outline" />
      </div>
    </div>
  )
}
