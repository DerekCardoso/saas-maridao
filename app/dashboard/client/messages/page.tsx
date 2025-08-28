"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ChatPreview {
  providerId: string
  providerName: string
  lastMessage: string
  timestamp: Date
  unreadCount: number
}

export default function MessagesPage() {
  const [chats, setChats] = useState<ChatPreview[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simula o carregamento de conversas do banco de dados
    const mockChats: ChatPreview[] = [
      {
        providerId: "1",
        providerName: "João Silva",
        lastMessage: "Sim, posso ir na terça-feira às 9h. Quantas tomadas você precisa instalar?",
        timestamp: new Date(2025, 4, 10, 14, 45),
        unreadCount: 2,
      },
      {
        providerId: "2",
        providerName: "Carlos Mendes",
        lastMessage: "Obrigado pela mensagem! Vou verificar e responder em breve.",
        timestamp: new Date(2025, 4, 9, 10, 15),
        unreadCount: 0,
      },
      {
        providerId: "3",
        providerName: "Roberto Almeida",
        lastMessage: "Você: Qual seria o valor para consertar um vazamento na pia da cozinha?",
        timestamp: new Date(2025, 4, 8, 16, 30),
        unreadCount: 0,
      },
    ]

    setChats(mockChats)
  }, [])

  const filteredChats = chats.filter((chat) => chat.providerName.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
        <p className="text-muted-foreground">Gerencie suas conversas com prestadores de serviços.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar conversas..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredChats.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhuma conversa encontrada.</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <Link
              href={`/dashboard/client/messages/${chat.providerId}?name=${encodeURIComponent(chat.providerName)}`}
              key={chat.providerId}
            >
              <Card className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {chat.providerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{chat.providerName}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {format(chat.timestamp, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                          </span>
                          {chat.unreadCount > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
