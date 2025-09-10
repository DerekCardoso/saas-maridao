"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Conversation {
  id: string
  clientName: string
  clientId: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  status: string
}

export function ProviderMessagesList() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch("/api/messages")
        if (response.ok) {
          const data = await response.json()
          setConversations(data)
        }
      } catch (error) {
        console.error("Erro ao buscar conversas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConversations()
  }, [])

  if (isLoading) {
    return <div>Carregando conversas...</div>
  }

  if (conversations.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <h3 className="mt-2 text-lg font-semibold">Nenhuma conversa</h3>
        <p className="text-muted-foreground">Você ainda não tem conversas com clientes.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <Link key={conversation.id} href={`/dashboard/provider/messages/${conversation.clientId}`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                    <AvatarFallback>
                      {conversation.clientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{conversation.clientName}</h3>
                      {conversation.status === "active" && (
                        <Badge variant="secondary" className="text-xs">
                          Ativo
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conversation.lastMessageTime), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs min-w-[20px] h-5">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
