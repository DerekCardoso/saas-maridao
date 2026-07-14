"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NotificationList } from "./notification-list"
import { Badge } from "@/components/ui/badge"

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Buscar contagem de notificações não lidas
  const fetchUnreadCount = async () => {
    try {
      const response = await fetch("/api/notifications?unread=true")
      if (response.ok) {
        const notifications = await response.json()
        setUnreadCount(notifications.length)
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error)
    }
  }

  // Buscar contagem inicial e configurar polling
  useEffect(() => {
    fetchUnreadCount()

    // Polling a cada 30 segundos
    const interval = setInterval(fetchUnreadCount, 30000)

    return () => clearInterval(interval)
  }, [])

  // Atualizar contagem quando o popover é fechado
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Pequeno atraso para garantir que as notificações foram marcadas como lidas
      setTimeout(fetchUnreadCount, 500)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
              variant="destructive"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <NotificationList onNotificationRead={fetchUnreadCount} />
      </PopoverContent>
    </Popover>
  )
}
