import { NextResponse } from "next/server"

// Mock data para demonstração
const mockAppointments = [
  {
    id: "1",
    clientId: "client-1",
    providerId: "provider-1",
    providerName: "João Silva",
    service: "Encanamento",
    date: "2024-01-15T10:00:00Z",
    status: "completed",
    price: 150,
    address: "Rua das Flores, 123",
    description: "Reparo de vazamento na cozinha",
  },
  {
    id: "2",
    clientId: "client-1",
    providerId: "provider-2",
    providerName: "Maria Santos",
    service: "Limpeza",
    date: "2024-01-20T14:00:00Z",
    status: "confirmed",
    price: 80,
    address: "Rua das Flores, 123",
    description: "Limpeza completa do apartamento",
  },
  {
    id: "3",
    clientId: "client-1",
    providerId: "provider-3",
    providerName: "Carlos Oliveira",
    service: "Elétrica",
    date: "2024-01-10T09:00:00Z",
    status: "cancelled",
    price: 200,
    address: "Rua das Flores, 123",
    description: "Instalação de tomadas",
  },
  {
    id: "4",
    clientId: "client-1",
    providerId: "provider-4",
    providerName: "Ana Costa",
    service: "Jardinagem",
    date: "2024-01-25T08:00:00Z",
    status: "pending",
    price: 120,
    address: "Rua das Flores, 123",
    description: "Poda de árvores e manutenção do jardim",
  },
]

export async function GET() {
  try {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockAppointments)
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Simular criação de agendamento
    const newAppointment = {
      id: Date.now().toString(),
      clientId: "client-1",
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newAppointment, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
