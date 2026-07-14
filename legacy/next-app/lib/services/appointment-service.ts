import prisma from "../db"
import { getAppointmentById, getAppointments, getAppointmentsByClientId, getAppointmentsByProviderId } from "../db"
import type { Appointment } from "../mock-data"

export interface CreateAppointmentParams {
  clientId: string
  providerId: string
  date: Date
  service: string
  details?: string
}

export interface AppointmentResponse {
  id: string
  clientName: string
  clientId: string
  clientPhone: string
  providerName: string
  providerId: string
  providerPhone: string
  date: Date
  service: string
  details: string | null
  status: string
  hasReview: boolean
  reviewId: string | null
}

export async function createAppointment(params: CreateAppointmentParams): Promise<{ id: string }> {
  const { clientId, providerId, date, service, details } = params

  // Verifica se o cliente existe
  const client = await prisma.client.findUnique({
    where: { id: clientId },
  })

  if (!client) {
    throw new Error("Cliente não encontrado")
  }

  // Verifica se o prestador existe
  const provider = await prisma.provider.findUnique({
    where: { id: providerId },
  })

  if (!provider) {
    throw new Error("Prestador não encontrado")
  }

  // Cria o agendamento
  const appointment = await prisma.appointment.create({
    data: {
      clientId,
      providerId,
      date,
      service,
      details,
      status: "pending", // pending, confirmed, completed, cancelled
    },
  })

  return {
    id: appointment.id,
  }
}

export async function getAppointmentsByUserId(
  userId: string,
  userType: "client" | "provider",
  filters?: {
    status?: string
    upcoming?: boolean
  },
): Promise<AppointmentResponse[]> {
  // Determina se o usuário é cliente ou prestador
  const isClient = userType === "client"

  // Busca o ID do cliente ou prestador
  let entityId: string | undefined
  if (isClient) {
    const client = await prisma.client.findFirst({
      where: { userId },
    })
    entityId = client?.id
  } else {
    const provider = await prisma.provider.findFirst({
      where: { userId },
    })
    entityId = provider?.id
  }

  if (!entityId) {
    throw new Error("Usuário não encontrado")
  }

  // Constrói a query
  const where: any = {}

  // Filtra por cliente ou prestador
  if (isClient) {
    where.clientId = entityId
  } else {
    where.providerId = entityId
  }

  // Filtra por status, se fornecido
  if (filters?.status) {
    where.status = filters.status
  }

  // Filtra por data (agendamentos futuros ou passados)
  if (filters?.upcoming !== undefined) {
    where.date = filters.upcoming ? { gte: new Date() } : { lt: new Date() }
  }

  // Busca os agendamentos
  const appointments = await prisma.appointment.findMany({
    where,
    include: {
      client: {
        include: {
          user: {
            select: {
              name: true,
              phone: true,
            },
          },
        },
      },
      provider: {
        include: {
          user: {
            select: {
              name: true,
              phone: true,
            },
          },
        },
      },
      review: true,
    },
    orderBy: {
      date: "desc",
    },
  })

  // Formata os dados para a resposta
  return appointments.map((appointment) => {
    return {
      id: appointment.id,
      clientName: appointment.client.user.name,
      clientId: appointment.clientId,
      clientPhone: appointment.client.user.phone,
      providerName: appointment.provider.user.name,
      providerId: appointment.providerId,
      providerPhone: appointment.provider.user.phone,
      date: appointment.date,
      service: appointment.service,
      details: appointment.details,
      status: appointment.status,
      hasReview: !!appointment.review,
      reviewId: appointment.review?.id || null,
    }
  })
}

export async function updateAppointmentStatus(id: string, status: string): Promise<void> {
  await prisma.appointment.update({
    where: { id },
    data: { status },
  })
}

export async function getAppointmentService(id: string): Promise<Appointment | null> {
  return getAppointmentById(id)
}

export async function getAllAppointmentsService(): Promise<Appointment[]> {
  return getAppointments()
}

export async function getClientAppointmentsService(clientId: string): Promise<Appointment[]> {
  return getAppointmentsByClientId(clientId)
}

export async function getProviderAppointmentsService(providerId: string): Promise<Appointment[]> {
  return getAppointmentsByProviderId(providerId)
}

export async function createAppointmentService(appointmentData: Omit<Appointment, "id">): Promise<Appointment> {
  // Simulando criação de agendamento com dados mockados
  const newAppointment: Appointment = {
    id: `appointment-${Date.now()}`,
    ...appointmentData,
  }
  return newAppointment
}

export async function updateAppointmentService(
  id: string,
  appointmentData: Partial<Appointment>,
): Promise<Appointment | null> {
  const appointment = await getAppointmentById(id)
  if (!appointment) return null

  // Simulando atualização de agendamento com dados mockados
  return {
    ...appointment,
    ...appointmentData,
  }
}

export async function deleteAppointmentService(id: string): Promise<boolean> {
  // Simulando exclusão de agendamento
  return true
}
