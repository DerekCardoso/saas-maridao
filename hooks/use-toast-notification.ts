"use client"

import { useState, useCallback } from "react"

export interface ToastData {
  title: string
  description?: string
  variant?: "default" | "destructive" | "success" | "warning" | "info"
}

export interface Toast extends ToastData {
  id: string
  timestamp: number
}

export function useToastNotification() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((data: ToastData) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: Toast = {
      ...data,
      id,
      timestamp: Date.now(),
    }

    setToasts((prev) => [...prev, toast])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const success = useCallback(
    (data: Omit<ToastData, "variant">) => {
      return addToast({ ...data, variant: "success" })
    },
    [addToast],
  )

  const error = useCallback(
    (data: Omit<ToastData, "variant">) => {
      return addToast({ ...data, variant: "destructive" })
    },
    [addToast],
  )

  const warning = useCallback(
    (data: Omit<ToastData, "variant">) => {
      return addToast({ ...data, variant: "warning" })
    },
    [addToast],
  )

  const info = useCallback(
    (data: Omit<ToastData, "variant">) => {
      return addToast({ ...data, variant: "info" })
    },
    [addToast],
  )

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
