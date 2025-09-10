import { type NextRequest, NextResponse } from "next/server"

// Mock data para conversas
const mockConversations = [
  {
    id: "1",
    clientName: "Ana Paula",
    clientId: "client-1",
    lastMessage: "Oi! Gostaria de agendar um serviço de elétrica para amanhã.",
    lastMessageTime: "2025-05-14T15:30:00Z",
    unreadCount: 2,
    status: "active",
  },
  {
    id: "2",
    clientName: "Marcos Silva",
    clientId: "client-2",
    lastMessage: "Obrigado pelo excelente trabalho!",
    lastMessageTime: "2025-05-13T18:45:00Z",
    unreadCount: 0,
    status: "completed",
  },
  {
    id: "3",
    clientName: "Juliana Costa",
    clientId: "client-3",
    lastMessage: "Você tem disponibilidade para esta semana?",
    lastMessageTime: "2025-05-12T09:15:00Z",
    unreadCount: 1,
    status: "pending",
  },
]

// Mock data para mensagens específicas
const mockMessages = {
  "1": [
    {
      id: "msg-1",
      senderId: "client-1",
      senderName: "Ana Paula",
      message: "Oi! Gostaria de agendar um serviço de elétrica.",
      timestamp: "2025-05-14T14:00:00Z",
      isProvider: false,
    },
    {
      id: "msg-2",
      senderId: "provider-1",
      senderName: "Carlos Oliveira",
      message: "Olá! Claro, posso ajudar. Qual tipo de serviço elétrico você precisa?",
      timestamp: "2025-05-14T14:05:00Z",
      isProvider: true,
    },
    {
      id: "msg-3",
      senderId: "client-1",
      senderName: "Ana Paula",
      message: "Preciso instalar algumas tomadas na cozinha e trocar um disjuntor.",
      timestamp: "2025-05-14T14:10:00Z",
      isProvider: false,
    },
    {
      id: "msg-4",
      senderId: "client-1",
      senderName: "Ana Paula",
      message: "Você tem disponibilidade para amanhã de manhã?",
      timestamp: "2025-05-14T15:30:00Z",
      isProvider: false,
    },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (clientId) {
      // Retornar mensagens específicas da conversa
      const messages = mockMessages[clientId as keyof typeof mockMessages] || []
      return NextResponse.json(messages)
    } else {
      // Retornar lista de conversas
      return NextResponse.json(mockConversations)
    }
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Simular envio de mensagem
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: "provider-1",
      senderName: "Carlos Oliveira",
      message: body.message,
      timestamp: new Date().toISOString(),
      isProvider: true,
    }

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
