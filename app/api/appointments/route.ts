import { type NextRequest, NextResponse } from "next/server"

// Mock data para agendamentos
const mockAppointments = [
  {
    id: "1",
    clientName: "Ana Paula",
    clientId: "client-1",
    service: "Elétrica",
    date: "2025-05-15T14:00:00Z",
    time: "14:00 - 16:00",
    status: "confirmed",
    address: "Rua das Flores, 123 - Jardim Primavera",
    phone: "(11) 99999-1111",
    price: 150,
    description: "Instalação de tomadas e interruptores",
    hasReview: false,
  },
  {
    id: "2",
    clientName: "Marcos Silva",
    clientId: "client-2",
    service: "Montagem de Móveis",
    date: "2025-05-18T09:00:00Z",
    time: "09:00 - 12:00",
    status: "confirmed",
    address: "Av. Paulista, 1000 - Bela Vista",
    phone: "(11) 99999-2222",
    price: 200,
    description: "Montagem de guarda-roupa e cômoda",
    hasReview: false,
  },
  {
    id: "3",
    clientName: "Juliana Costa",
    clientId: "client-3",
    service: "Elétrica",
    date: "2025-05-22T10:00:00Z",
    time: "10:00 - 12:00",
    status: "pending",
    address: "Rua Augusta, 500 - Consolação",
    phone: "(11) 99999-3333",
    price: 120,
    description: "Reparo em chuveiro elétrico",
    hasReview: false,
  },
  {
    id: "4",
    clientName: "Ricardo Mendes",
    clientId: "client-4",
    service: "Reparos Gerais",
    date: "2025-05-05T13:00:00Z",
    time: "13:00 - 15:00",
    status: "completed",
    address: "Rua Oscar Freire, 200 - Jardins",
    phone: "(11) 99999-4444",
    price: 180,
    description: "Reparo em torneira e vaso sanitário",
    hasReview: true,
  },
  {
    id: "5",
    clientName: "Fernanda Lima",
    clientId: "client-5",
    service: "Instalações",
    date: "2025-04-28T10:00:00Z",
    time: "10:00 - 12:00",
    status: "completed",
    address: "Alameda Santos, 800 - Cerqueira César",
    phone: "(11) 99999-5555",
    price: 250,
    description: "Instalação de ar condicionado",
    hasReview: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500))

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let filteredAppointments = mockAppointments

    if (status && status !== "all") {
      filteredAppointments = mockAppointments.filter((appointment) => appointment.status === status)
    }

    return NextResponse.json(filteredAppointments)
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Simular criação de agendamento
    const newAppointment = {
      id: Date.now().toString(),
      ...body,
      status: "pending",
    }

    return NextResponse.json(newAppointment, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
