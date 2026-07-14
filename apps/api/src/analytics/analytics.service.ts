import { Injectable } from "@nestjs/common"
import { DatabaseService } from "../database/database.service"

@Injectable()
export class AnalyticsService {
  constructor(private readonly database: DatabaseService) {}

  async track(input: {
    userId?: string
    name: "provider_search" | "provider_view" | "whatsapp_click"
    providerId?: string
    metadata?: Record<string, unknown>
  }) {
    await this.database.pool.query(
      `insert into analytics_events (user_id, name, provider_id, metadata)
       values ($1, $2, $3, $4)`,
      [input.userId ?? null, input.name, input.providerId ?? null, input.metadata ?? {}]
    )
    return { accepted: true }
  }
}
