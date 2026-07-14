import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import type { AuthUser } from "../auth/auth-user"
import { DatabaseService } from "../database/database.service"
import { NotificationsService } from "../notifications/notifications.service"

@Injectable()
export class ReviewsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly notifications: NotificationsService
  ) {}

  async create(
    user: AuthUser,
    input: { appointmentId: string; rating: number; comment?: string }
  ) {
    if (user.role !== "client") throw new ForbiddenException()
    const client = await this.database.pool.connect()
    try {
      await client.query("begin")
      const appointmentResult = await client.query(
        `select a.*, cp.user_id as client_user_id, pp.user_id as provider_user_id,
          provider_user.email as provider_email
         from appointments a
         join client_profiles cp on cp.id = a.client_id
         join provider_profiles pp on pp.id = a.provider_id
         join profiles provider_user on provider_user.id = pp.user_id
         where a.id = $1 for update`,
        [input.appointmentId]
      )
      const appointment = appointmentResult.rows[0]
      if (!appointment) throw new NotFoundException("Agendamento nao encontrado.")
      if (appointment.client_user_id !== user.id) throw new ForbiddenException()
      if (appointment.status !== "completed") {
        throw new ConflictException("Somente servicos concluidos podem ser avaliados.")
      }

      const reviewResult = await client.query(
        `insert into reviews (appointment_id, client_id, provider_id, rating, comment)
         values ($1, $2, $3, $4, $5) returning *`,
        [
          input.appointmentId,
          appointment.client_id,
          appointment.provider_id,
          input.rating,
          input.comment ?? null
        ]
      )
      await this.recalculate(client, appointment.provider_id)
      await client.query("commit")

      await this.notifications.create({
        userId: appointment.provider_user_id,
        email: appointment.provider_email,
        type: "review_received",
        title: "Nova avaliacao",
        body: `Voce recebeu uma avaliacao de ${input.rating} estrelas.`,
        data: { reviewId: reviewResult.rows[0].id }
      })
      return reviewResult.rows[0]
    } catch (error) {
      await client.query("rollback")
      if ((error as { code?: string }).code === "23505") {
        throw new ConflictException("Este agendamento ja foi avaliado.")
      }
      throw error
    } finally {
      client.release()
    }
  }

  async listPublic(providerId: string) {
    const result = await this.database.pool.query(
      `select r.id, r.rating, r.comment, r.created_at, p.name as client_name
       from reviews r
       join client_profiles cp on cp.id = r.client_id
       join profiles p on p.id = cp.user_id
       where r.provider_id = $1 and r.status = 'visible'
       order by r.created_at desc`,
      [providerId]
    )
    return result.rows
  }

  async report(userId: string, reviewId: string, reason: string) {
    await this.database.pool.query(
      `insert into review_reports (review_id, reporter_user_id, reason)
       values ($1, $2, $3) on conflict do nothing`,
      [reviewId, userId, reason]
    )
    await this.database.pool.query(
      "update reviews set status = 'flagged', updated_at = now() where id = $1 and status = 'visible'",
      [reviewId]
    )
    return { reported: true }
  }

  async recalculate(client: { query: (text: string, values?: unknown[]) => Promise<any> }, providerId: string) {
    await client.query(
      `update provider_profiles pp set
        rating = coalesce(stats.rating, 0),
        review_count = coalesce(stats.review_count, 0),
        updated_at = now()
       from (
         select $1::uuid as provider_id, avg(rating)::numeric(3,2) as rating,
           count(*)::int as review_count
         from reviews where provider_id = $1 and status <> 'hidden'
       ) stats
       where pp.id = stats.provider_id`,
      [providerId]
    )
  }
}
