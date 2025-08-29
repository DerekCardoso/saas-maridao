"use client"

import { useState, useEffect } from "react"
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
  onNotificationRead?: () => void
}

export function NotificationList({ onNotificationRead }: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  // Buscar notificações
  const fetchNotifications = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/notifications")
      if (response.ok) {
        const data = await response.json()
        setNotifications(data)
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Buscar notificações iniciais
  useEffect(() => {
    fetchNotifications()
  }, [])

  // Marcar notificação como lida
  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
      })

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
        )
        if (onNotificationRead) {
          onNotificationRead()
        }
      }
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error)
    }
  }

  // Excluir notificação
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id))
        if (onNotificationRead) {
          onNotificationRead()
        }
      }
    } catch (error) {
      console.error("Erro ao excluir notificação:", error)
    }
  }

  // Marcar todas como lidas
  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch("/api/notifications/read-all", {
        method: "POST",
      })

      if (response.ok) {
        setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
        if (onNotificationRead) {
          onNotificationRead()
        }
      }
    } catch (error) {
      console.error("Erro ao marcar todas as notificações como lidas:", error)
    }
  }

  // Navegar para o link da notificação
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id)
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
        <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
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
            {isLoading ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-sm text-muted-foreground">Carregando notificações...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
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
                    onMarkAsRead={() => handleMarkAsRead(notification.id)}
                    onDelete={() => handleDelete(notification.id)}
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
