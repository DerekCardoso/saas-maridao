import { getNotificationById, getNotifications, getNotificationsByUserId } from "../db"
import type { Notification } from "../mock-data"

export async function getNotificationService(id: string): Promise<Notification | null> {
  return getNotificationById(id)
}

export async function getAllNotificationsService(): Promise<Notification[]> {
  return getNotifications()
}

export async function getUserNotificationsService(userId: string): Promise<Notification[]> {
  return getNotificationsByUserId(userId)
}

export async function createNotificationService(notificationData: Omit<Notification, "id">): Promise<Notification> {
  // Simulando criação de notificação com dados mockados
  const newNotification: Notification = {
    id: `notification-${Date.now()}`,
    ...notificationData,
  }
  return newNotification
}

export async function updateNotificationService(
  id: string,
  notificationData: Partial<Notification>,
): Promise<Notification | null> {
  const notification = await getNotificationById(id)
  if (!notification) return null

  // Simulando atualização de notificação com dados mockados
  return {
    ...notification,
    ...notificationData,
  }
}

export async function markAllNotificationsAsReadService(userId: string): Promise<boolean> {
  // Simulando marcação de todas as notificações como lidas
  return true
}

export async function deleteNotificationService(id: string): Promise<boolean> {
  // Simulando exclusão de notificação
  return true
}
