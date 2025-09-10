import { NextResponse } from "next/server"

// Mock data para demonstração
const mockReviews = [
  {
    id: "1",
    clientId: "client-1",
    providerId: "provider-1",
    appointmentId: "1",
    providerName: "João Silva",
    service: "Encanamento",
    rating: 5,
    comment: "Excelente profissional! Resolveu o problema rapidamente e com qualidade.",
    date: "2024-01-16T10:00:00Z",
    status: "published",
  },
  {
    id: "2",
    clientId: "client-1",
    providerId: "provider-2",
    appointmentId: "2",
    providerName: "Maria Santos",
    service: "Limpeza",
    rating: 4,
    comment: "Muito boa! Deixou tudo impecável.",
    date: "2024-01-21T14:00:00Z",
    status: "published",
  },
  {
    id: "3",
    clientId: "client-1",
    providerId: "provider-4",
    appointmentId: "4",
    providerName: "Ana Costa",
    service: "Jardinagem",
    rating: 0,
    comment: "",
    date: null,
    status: "pending",
  },
]

export async function GET() {
  try {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json(mockReviews)
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Simular criação de avaliação
    const newReview = {
      id: Date.now().toString(),
      clientId: "client-1",
      ...body,
      date: new Date().toISOString(),
      status: "published",
    }

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar avaliação:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
