"use client"

import type React from "react"

import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
  action?: React.ReactNode
  id?: string
}

export function useToastNotification() {
  const { toast } = useToast()

  const showToast = (type: ToastType, options: ToastOptions) => {
    const { title, description, duration = 5000, action, id } = options

    // Definir ícones e variantes com base no tipo
    let icon
    let variant: "default" | "destructive" | "success" | "warning" | "info" = "default"

    switch (type) {
      case "success":
        icon = <CheckCircle className="h-5 w-5 text-green-500" />
        variant = "success"
        break
      case "error":
        icon = <AlertCircle className="h-5 w-5 text-red-500" />
        variant = "destructive"
        break
      case "warning":
        icon = <AlertTriangle className="h-5 w-5 text-amber-500" />
        variant = "warning"
        break
      case "info":
        icon = <Info className="h-5 w-5 text-blue-500" />
        variant = "info"
        break
    }

    return toast({
      title,
      description,
      duration,
      action,
      variant,
      icon,
      id,
    })
  }

  // Métodos específicos para cada tipo de toast
  const success = (options: ToastOptions) => showToast("success", options)
  const error = (options: ToastOptions) => showToast("error", options)
  const info = (options: ToastOptions) => showToast("info", options)
  const warning = (options: ToastOptions) => showToast("warning", options)

  return {
    success,
    error,
    info,
    warning,
  }
}
