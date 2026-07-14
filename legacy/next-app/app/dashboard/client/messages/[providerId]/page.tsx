"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { WhatsAppButton } from "@/components/whatsapp-button"

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  isRead: boolean
}

export default function ChatPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const providerId = params.providerId as string
  const providerName = searchParams.get("name") || "Prestador"

  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simula o carregamento de mensagens do banco de dados
  useEffect(() => {
    // Em uma implementação real, você buscaria as mensagens do banco de dados
    const mockMessages: Message[] = [
      {
        id: "1",
        senderId: "client",
        receiverId: providerId,
        content: "Olá! Gostaria de saber se você tem disponibilidade para instalar algumas tomadas na próxima semana.",
        timestamp: new Date(2025, 4, 10, 14, 30),
        isRead: true,
      },
      {
        id: "2",
        senderId: providerId,
        receiverId: "client",
        content: "Olá! Sim, tenho disponibilidade. Qual seria o melhor dia para você?",
        timestamp: new Date(2025, 4, 10, 14, 35),
        isRead: true,
      },
      {
        id: "3",
        senderId: "client",
        receiverId: providerId,
        content: "Seria possível na terça-feira pela manhã?",
        timestamp: new Date(2025, 4, 10, 14, 40),
        isRead: true,
      },
      {
        id: "4",
        senderId: providerId,
        receiverId: "client",
        content: "Sim, posso ir na terça-feira às 9h. Quantas tomadas você precisa instalar?",
        timestamp: new Date(2025, 4, 10, 14, 45),
        isRead: true,
      },
    ]

    setMessages(mockMessages)
  }, [providerId])

  // Rola para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "client",
      receiverId: providerId,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simula resposta do prestador após 2 segundos
    setTimeout(() => {
      const providerReply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: providerId,
        receiverId: "client",
        content: "Obrigado pela mensagem! Vou verificar e responder em breve.",
        timestamp: new Date(),
        isRead: false,
      }

      setMessages((prev) => [...prev, providerReply])
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Cabeçalho do chat */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {providerName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{providerName}</h2>
            <p className="text-sm text-muted-foreground">Prestador de serviços</p>
          </div>
        </div>
        <WhatsAppButton
          phoneNumber="11999887766"
          message={`Olá ${providerName}! Estou entrando em contato pelo Maridão.`}
          size="sm"
        />
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.senderId === "client" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.senderId === "client" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.senderId === "client" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {format(message.timestamp, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de input */}
      <div className="p-4 border-t flex gap-2">
        <Input
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={newMessage.trim() === ""}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Enviar</span>
        </Button>
      </div>
    </div>
  )
}
