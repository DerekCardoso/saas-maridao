"use client"

import type React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface WhatsAppButtonProps extends ButtonProps {
  phoneNumber: string
  message?: string
  children?: React.ReactNode
}

export function WhatsAppButton({
  phoneNumber,
  message = "Olá! Vi seu perfil no Maridão e gostaria de saber mais sobre seus serviços.",
  children,
  ...props
}: WhatsAppButtonProps) {
  const handleClick = () => {
    // Formata o número de telefone (remove caracteres não numéricos)
    const formattedPhone = phoneNumber.replace(/\D/g, "")

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message)

    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`

    // Abre o link em uma nova aba
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button onClick={handleClick} {...props}>
      <MessageSquare className="mr-2 h-4 w-4" />
      {children || "Falar pelo WhatsApp"}
    </Button>
  )
}
