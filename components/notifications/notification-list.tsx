"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationItem } from "./notification-item"

interface Notification {
  id: string
  type: string
  title: string
  content: string
  isRead: boolean
  linkUrl: string | null
  createdAt: string
}

interface NotificationListProps {
  notifications: Array<{
    id: string
    type: string
    title: string
    content: string
    isRead: boolean
    linkUrl: string | null
    createdAt: string
  }>
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onDelete: (id: string) => void
}

export function NotificationList({ notifications, onMarkAsRead, onMarkAllAsRead, onDelete }: NotificationListProps) {
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  // Remove os estados internos e useEffect, pois agora recebemos tudo via props

  // Navegar para o link da notificação
  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id)
    }

    if (notification.linkUrl) {
      router.push(notification.linkUrl)
    }
  }

  // Filtrar notificações com base na aba ativa
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    return notification.type === activeTab
  })

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Notificações</h3>
        <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
          <Check className="h-4 w-4 mr-1" />
          Marcar todas como lidas
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              Todas
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              Não lidas
            </TabsTrigger>
            <TabsTrigger value="appointment" className="flex-1">
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="message" className="flex-1">
              Mensagens
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <ScrollArea className="h-[300px]">
            {notifications.length === 0 ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-sm text-muted-foreground">Nenhuma notificação encontrada</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleNotificationClick(notification)}
                    onMarkAsRead={() => onMarkAsRead(notification.id)}
                    onDelete={() => onDelete(notification.id)}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
