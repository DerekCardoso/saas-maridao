"use client"

import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Bell, Calendar, Check, MessageSquare, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: string
  title: string
  content: string
  isRead: boolean
  linkUrl: string | null
  createdAt: string
}

interface NotificationItemProps {
  notification: Notification
  onClick: () => void
  onMarkAsRead: () => void
  onDelete: () => void
}

export function NotificationItem({ notification, onClick, onMarkAsRead, onDelete }: NotificationItemProps) {
  // Formatar a data relativa (ex: "há 5 minutos")
  const formattedDate = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
    locale: ptBR,
  })

  // Determinar o ícone com base no tipo de notificação
  const getIcon = () => {
    switch (notification.type) {
      case "appointment":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "review":
        return <Star className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div
      className={cn(
        "p-4 hover:bg-muted/50 cursor-pointer flex items-start gap-3",
        !notification.isRead && "bg-muted/30",
      )}
      onClick={onClick}
    >
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className={cn("font-medium text-sm", !notification.isRead && "font-semibold")}>{notification.title}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{formattedDate}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.content}</p>
      </div>
      <div className="flex flex-col gap-1 ml-2" onClick={(e) => e.stopPropagation()}>
        {!notification.isRead && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMarkAsRead}>
            <Check className="h-4 w-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
