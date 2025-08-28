"use client"

import type React from "react"
import { createContext, useContext, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface ToastMessage {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive" | "success" | "warning"
  duration?: number
}

interface ToastContextType {
  showToast: (message: Omit<ToastMessage, "id">) => void
  showSuccess: (title: string, description?: string) => void
  showError: (title: string, description?: string) => void
  showWarning: (title: string, description?: string) => void
  showInfo: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  const showToast = useCallback(
    (message: Omit<ToastMessage, "id">) => {
      toast({
        title: message.title,
        description: message.description,
        variant: message.variant || "default",
        duration: message.duration || 5000,
      })
    },
    [toast],
  )

  const showSuccess = useCallback(
    (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default",
        duration: 5000,
      })
    },
    [toast],
  )

  const showError = useCallback(
    (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "destructive",
        duration: 5000,
      })
    },
    [toast],
  )

  const showWarning = useCallback(
    (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default",
        duration: 5000,
      })
    },
    [toast],
  )

  const showInfo = useCallback(
    (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default",
        duration: 5000,
      })
    },
    [toast],
  )

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToastContext(): ToastContextType {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}
