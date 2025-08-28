"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Phone, Video } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  clientName: string
  clientId: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
}

export function ProviderMessagesList() {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      clientName: "Ana Paula",
      clientId: "client-1",
      lastMessage: "Olá! Gostaria de agendar um serviço de elétrica para amanhã.",
      timestamp: "2 min atrás",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      clientName: "Marcos Silva",
      clientId: "client-2",
      lastMessage: "Obrigado pelo excelente trabalho! Recomendarei seus serviços.",
      timestamp: "1 hora atrás",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      clientName: "Juliana Costa",
      clientId: "client-3",
      lastMessage: "Você pode vir hoje à tarde? É urgente.",
      timestamp: "3 horas atrás",
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: "4",
      clientName: "Ricardo Mendes",
      clientId: "client-4",
      lastMessage: "Perfeito! Até amanhã então.",
      timestamp: "1 dia atrás",
      unreadCount: 0,
      isOnline: false,
    },
  ])

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-muted-foreground">Nenhuma conversa encontrada.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <Card key={message.id} className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {message.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {message.isOnline && (
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{message.clientName}</h3>
                  <div className="flex items-center gap-2">
                    {message.unreadCount > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0">
                        {message.unreadCount}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-1">{message.lastMessage}</p>
              </div>

              <div className="flex gap-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/provider/messages/${message.clientId}`}>
                    <MessageSquare className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
