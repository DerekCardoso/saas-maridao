"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NotificationList } from "./notification-list"
import { Badge } from "@/components/ui/badge"
import { useRealTimeNotifications } from "@/hooks/use-real-time-notifications"
import { useAuth } from "@/hooks/use-auth"

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useRealTimeNotifications(
    user?.id,
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
        <NotificationList
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onDelete={deleteNotification}
        />
      </PopoverContent>
    </Popover>
  )
}
