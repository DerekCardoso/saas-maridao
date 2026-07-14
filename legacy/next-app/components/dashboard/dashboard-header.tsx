"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ClientSidebar } from "./client-sidebar"
import { ProviderSidebar } from "./provider-sidebar"
import { AdminSidebar } from "./admin-sidebar"
import { NotificationBell } from "../notifications/notification-bell"
import { useAuth } from "@/hooks/use-auth"
import { LogoutButton } from "../auth/logout-button"

interface DashboardHeaderProps {
  userType: "client" | "provider" | "admin"
}

export function DashboardHeader({ userType }: DashboardHeaderProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  // Determina qual sidebar mostrar com base no tipo de usuário
  const getSidebar = () => {
    switch (userType) {
      case "client":
        return <ClientSidebar />
      case "provider":
        return <ProviderSidebar />
      case "admin":
        return <AdminSidebar />
      default:
        return null
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          {getSidebar()}
        </SheetContent>
      </Sheet>
      <div className="flex-1">
        <Link href={`/dashboard/${userType}`} className="flex items-center gap-2 font-semibold">
          <span className="text-primary">Maridão</span>
          <span className="text-muted-foreground">Dashboard</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <NotificationBell />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Abrir menu de usuário</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.name || "Minha Conta"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/${userType}/profile`} className="w-full cursor-pointer">
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/${userType}/settings`} className="w-full cursor-pointer">
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
              <LogoutButton variant="ghost" className="w-full justify-start p-0 font-normal" showIcon={false} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
