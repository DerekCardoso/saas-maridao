import { type NextRequest, NextResponse } from "next/server"

// Mock data para avaliações
const mockReviews = [
  {
    id: "1",
    clientName: "Ana Paula",
    clientId: "client-1",
    appointmentId: "4",
    service: "Reparos Gerais",
    rating: 5,
    comment: "Excelente profissional! Muito pontual e caprichoso no trabalho. Recomendo!",
    date: "2025-05-06T10:00:00Z",
    response: "Muito obrigado pela avaliação! Foi um prazer atendê-la.",
  },
  {
    id: "2",
    clientName: "Fernanda Lima",
    clientId: "client-5",
    appointmentId: "5",
    service: "Instalações",
    rating: 5,
    comment: "Instalação perfeita do ar condicionado. Profissional muito competente e educado.",
    date: "2025-04-29T15:30:00Z",
    response: null,
  },
  {
    id: "3",
    clientName: "Carlos Santos",
    clientId: "client-6",
    appointmentId: "6",
    service: "Elétrica",
    rating: 4,
    comment: "Bom trabalho, mas chegou um pouco atrasado. No geral, recomendo.",
    date: "2025-04-25T14:20:00Z",
    response: "Peço desculpas pelo atraso. Obrigado pelo feedback!",
  },
  {
    id: "4",
    clientName: "Maria Oliveira",
    clientId: "client-7",
    appointmentId: "7",
    service: "Montagem de Móveis",
    rating: 5,
    comment: "Montou todos os móveis com perfeição. Muito cuidadoso e organizado.",
    date: "2025-04-20T16:45:00Z",
    response: null,
  },
]

export async function GET(request: NextRequest) {
  try {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json(mockReviews)
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Simular resposta a avaliação
    const updatedReview = {
      id: body.reviewId,
      response: body.response,
      responseDate: new Date().toISOString(),
    }

    return NextResponse.json(updatedReview, { status: 201 })
  } catch (error) {
    console.error("Erro ao responder avaliação:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
