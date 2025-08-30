"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast-animated"
import { useToast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useEffect, useState } from "react"

export function Toaster() {
  const { toasts } = useToast()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [position, setPosition] = useState({
    top: undefined,
    bottom: 0,
    right: 0,
  })

  // Ajusta a posição dos toasts com base no tamanho da tela
  useEffect(() => {
    if (isMobile) {
      setPosition({
        top: undefined,
        bottom: 0,
        right: 0,
      })
    } else {
      setPosition({
        top: undefined,
        bottom: 0,
        right: 0,
      })
    }
  }, [isMobile])

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props} className="group">
          <div className="flex items-start gap-2">
            {props.icon && <div className="mt-1">{props.icon}</div>}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
          </div>
          {action}
          <ToastClose
            aria-label="Fechar notificação"
            className="absolute right-2 top-2 opacity-70 transition-opacity group-hover:opacity-100"
          />
        </Toast>
      ))}
      <ToastViewport
        className={`fixed z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 outline-none ${
          isMobile ? "bottom-0 left-0 right-0 pb-safe-area-inset-bottom" : "bottom-0 right-0 top-auto sm:max-w-[420px]"
        }`}
        style={{
          top: position.top,
          bottom: position.bottom,
          right: position.right,
        }}
      />
    </ToastProvider>
  )
}
