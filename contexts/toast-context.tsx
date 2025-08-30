"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { useToastNotification } from "@/hooks/use-toast-notification"

type ToastOptions = {
  title?: string
  description?: string
  duration?: number
  action?: React.ReactNode
  id?: string
}

interface ToastContextType {
  success: (options: ToastOptions) => { id: string; dismiss: () => void; update: (props: any) => void }
  error: (options: ToastOptions) => { id: string; dismiss: () => void; update: (props: any) => void }
  info: (options: ToastOptions) => { id: string; dismiss: () => void; update: (props: any) => void }
  warning: (options: ToastOptions) => { id: string; dismiss: () => void; update: (props: any) => void }
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toast = useToastNotification()

  return <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}
