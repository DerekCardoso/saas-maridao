import { Injectable } from "@nestjs/common"
import { Resend } from "resend"
import { DatabaseService } from "../database/database.service"

type NotificationType =
  | "appointment_created"
  | "appointment_updated"
  | "provider_approved"
  | "provider_rejected"
  | "review_received"
  | "subscription_updated"

@Injectable()
export class NotificationsService {
  private readonly resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null

  constructor(private readonly database: DatabaseService) {}

  async create(input: {
    userId: string
    type: NotificationType
    title: string
    body: string
    data?: Record<string, unknown>
    email?: string
  }) {
    const result = await this.database.pool.query(
      `insert into notifications (user_id, type, title, body, data)
       values ($1, $2, $3, $4, $5) returning *`,
      [input.userId, input.type, input.title, input.body, input.data ?? {}]
    )

    if (this.resend && input.email) {
      await this.resend.emails.send({
        from: process.env.EMAIL_FROM ?? "Maridao <no-reply@example.com>",
        to: input.email,
        subject: input.title,
        text: input.body
      })
    }

    return result.rows[0]
  }

  async list(userId: string) {
    const result = await this.database.pool.query(
      `select * from notifications where user_id = $1
       order by created_at desc limit 50`,
      [userId]
    )
    return result.rows
  }

  async markRead(userId: string, id: string) {
    await this.database.pool.query(
      "update notifications set read_at = now() where id = $1 and user_id = $2",
      [id, userId]
    )
    return { updated: true }
  }
}
