import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from "@nestjs/common"
import {
  canTransitionAppointment,
  type AppointmentStatus,
  type CreateAppointmentInput
} from "@maridao/shared"
import type { AuthUser } from "../auth/auth-user"
import { DatabaseService } from "../database/database.service"
import { NotificationsService } from "../notifications/notifications.service"

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly notifications: NotificationsService
  ) {}

  async create(user: AuthUser, input: CreateAppointmentInput) {
    if (user.role !== "client") throw new ForbiddenException()
    const client = await this.database.pool.connect()
    try {
      await client.query("begin")
      const clientProfile = await client.query(
        "select id from client_profiles where user_id = $1",
        [user.id]
      )
      const provider = await client.query(
        `select pp.id, pp.user_id, p.email, pp.display_name
         from provider_profiles pp join profiles p on p.id = pp.user_id
         where pp.id = $1 and pp.status = 'approved' and p.is_blocked = false`,
        [input.providerId]
      )
      if (!clientProfile.rows[0] || !provider.rows[0]) {
        throw new NotFoundException("Cliente ou profissional nao encontrado.")
      }

      const inserted = await client.query(
        `insert into appointments (
          client_id, provider_id, service_category_id, scheduled_for, notes
        ) values ($1, $2, $3, $4, $5) returning *`,
        [
          clientProfile.rows[0].id,
          input.providerId,
          input.serviceCategoryId,
          input.scheduledFor,
          input.notes ?? null
        ]
      )
      await client.query("commit")

      const appointment = inserted.rows[0]
      await this.notifications.create({
        userId: provider.rows[0].user_id,
        email: provider.rows[0].email,
        type: "appointment_created",
        title: "Novo agendamento",
        body: `Voce recebeu uma solicitacao para ${new Date(input.scheduledFor).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}.`,
        data: { appointmentId: appointment.id }
      })
      return appointment
    } catch (error) {
      await client.query("rollback")
      if ((error as { code?: string }).code === "23505") {
        throw new ConflictException("Este horario nao esta mais disponivel.")
      }
      throw error
    } finally {
      client.release()
    }
  }

  async listMine(user: AuthUser) {
    const roleFilter =
      user.role === "client"
        ? "cp.user_id = $1"
        : user.role === "provider"
          ? "pp.user_id = $1"
          : "true"
    const parameters = user.role === "admin" || user.role === "super_admin" ? [] : [user.id]
    const result = await this.database.pool.query(
      `select a.*, client_user.name as client_name, provider_user.name as provider_name,
        sc.name as service_name, r.id as review_id
       from appointments a
       join client_profiles cp on cp.id = a.client_id
       join profiles client_user on client_user.id = cp.user_id
       join provider_profiles pp on pp.id = a.provider_id
       join profiles provider_user on provider_user.id = pp.user_id
       join service_categories sc on sc.id = a.service_category_id
       left join reviews r on r.appointment_id = a.id
       where ${roleFilter}
       order by a.scheduled_for desc`,
      parameters
    )
    return result.rows
  }

  async updateStatus(user: AuthUser, id: string, nextStatus: AppointmentStatus) {
    const client = await this.database.pool.connect()
    try {
      await client.query("begin")
      const result = await client.query(
        `select a.*, cp.user_id as client_user_id, pp.user_id as provider_user_id,
          client_user.email as client_email, provider_user.email as provider_email
         from appointments a
         join client_profiles cp on cp.id = a.client_id
         join profiles client_user on client_user.id = cp.user_id
         join provider_profiles pp on pp.id = a.provider_id
         join profiles provider_user on provider_user.id = pp.user_id
         where a.id = $1 for update`,
        [id]
      )
      const appointment = result.rows[0]
      if (!appointment) throw new NotFoundException("Agendamento nao encontrado.")
      if (user.role === "client" && appointment.client_user_id !== user.id) throw new ForbiddenException()
      if (user.role === "provider" && appointment.provider_user_id !== user.id) throw new ForbiddenException()
      if (!canTransitionAppointment(appointment.status, nextStatus, user.role)) {
        throw new ConflictException("Mudanca de status nao permitida.")
      }

      const updated = await client.query(
        "update appointments set status = $1, updated_at = now() where id = $2 returning *",
        [nextStatus, id]
      )
      await client.query("commit")

      const recipient =
        user.role === "client"
          ? { id: appointment.provider_user_id, email: appointment.provider_email }
          : { id: appointment.client_user_id, email: appointment.client_email }
      await this.notifications.create({
        userId: recipient.id,
        email: recipient.email,
        type: "appointment_updated",
        title: "Agendamento atualizado",
        body: `O agendamento agora esta como ${nextStatus}.`,
        data: { appointmentId: id, status: nextStatus }
      })
      return updated.rows[0]
    } catch (error) {
      await client.query("rollback")
      throw error
    } finally {
      client.release()
    }
  }
}
