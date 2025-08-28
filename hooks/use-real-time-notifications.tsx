"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface Notification {
  id: string
  title: string
  message: string
  type: "appointment" | "message" | "review" | "payment" | "system"
  isRead: boolean
  createdAt: Date
  userId: string
}

export function useRealTimeNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const { toast } = useToast()

  // Simular notificações em tempo real
  useEffect(() => {
    if (!userId) return

    // Carregar notificações iniciais
    const initialNotifications: Notification[] = [
      {
        id: "1",
        title: "Novo agendamento",
        message: "Você tem um novo agendamento para amanhã às 14h",
        type: "appointment",
        isRead: false,
        createdAt: new Date(),
        userId,
      },
    ]

    setNotifications(initialNotifications)
    setUnreadCount(initialNotifications.filter((n) => !n.isRead).length)

    // Simular notificações em tempo real
    const interval = setInterval(() => {
      // 20% de chance de receber uma nova notificação a cada 30 segundos
      if (Math.random() < 0.2) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: getRandomNotificationTitle(),
          message: getRandomNotificationMessage(),
          type: getRandomNotificationType(),
          isRead: false,
          createdAt: new Date(),
          userId,
        }

        setNotifications((prev) => [newNotification, ...prev])
        setUnreadCount((prev) => prev + 1)

        // Mostrar toast para nova notificação
        toast({
          title: newNotification.title,
          description: newNotification.message,
          duration: 5000,
        })
      }
    }, 30000) // 30 segundos

    return () => clearInterval(interval)
  }, [userId, toast])

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
    setUnreadCount(0)
  }, [])

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications((prev) => {
      const notification = prev.find((n) => n.id === notificationId)
      const newNotifications = prev.filter((n) => n.id !== notificationId)

      if (notification && !notification.isRead) {
        setUnreadCount((prevCount) => Math.max(0, prevCount - 1))
      }

      return newNotifications
    })
  }, [])

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  }
}

function getRandomNotificationTitle(): string {
  const titles = [
    "Novo agendamento",
    "Mensagem recebida",
    "Avaliação recebida",
    "Pagamento confirmado",
    "Lembrete de serviço",
  ]
  return titles[Math.floor(Math.random() * titles.length)]
}

function getRandomNotificationMessage(): string {
  const messages = [
    "Você tem um novo agendamento para esta semana",
    "Um cliente enviou uma mensagem para você",
    "Você recebeu uma nova avaliação de 5 estrelas",
    "O pagamento do seu último serviço foi confirmado",
    "Lembre-se do seu agendamento de amanhã às 10h",
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

function getRandomNotificationType(): Notification["type"] {
  const types: Notification["type"][] = ["appointment", "message", "review", "payment", "system"]
  return types[Math.floor(Math.random() * types.length)]
}
