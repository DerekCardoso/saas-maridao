"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Calendar,
  Users,
  MessageSquare,
  Star,
  Settings,
  User,
  History,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/dashboard/client", icon: Home },
  { name: "Agendamentos", href: "/dashboard/client/appointments", icon: Calendar, badge: "3" },
  { name: "Profissionais", href: "/dashboard/client/providers", icon: Users },
  { name: "Mensagens", href: "/dashboard/client/messages", icon: MessageSquare, badge: "2" },
  { name: "Avaliações", href: "/dashboard/client/reviews", icon: Star },
  { name: "Histórico", href: "/dashboard/client/history", icon: History },
  { name: "Perfil", href: "/dashboard/client/profile", icon: User },
  { name: "Configurações", href: "/dashboard/client/settings", icon: Settings },
]

export function ClientSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Maridão</h2>
              <p className="text-sm text-gray-500">Cliente</p>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-3">
            <h3 className="text-sm font-medium text-blue-900">Plano Premium</h3>
            <p className="text-xs text-blue-700 mt-1">Acesse recursos exclusivos e tenha prioridade nos agendamentos</p>
            <Button size="sm" className="w-full mt-2">
              Fazer Upgrade
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
