import { Injectable, NotFoundException } from "@nestjs/common"
import { DatabaseService } from "../database/database.service"
import { generateHourlySlots } from "./slots"

@Injectable()
export class AvailabilityService {
  constructor(private readonly database: DatabaseService) {}

  async replaceWeekly(userId: string, slots: Array<{ weekday: number; startTime: string; endTime: string }>) {
    const provider = await this.providerForUser(userId)
    const client = await this.database.pool.connect()
    try {
      await client.query("begin")
      await client.query("delete from weekly_availability where provider_id = $1", [provider.id])
      for (const slot of slots) {
        await client.query(
          `insert into weekly_availability (provider_id, weekday, start_time, end_time)
           values ($1, $2, $3, $4)`,
          [provider.id, slot.weekday, slot.startTime, slot.endTime]
        )
      }
      await client.query("commit")
      return { updated: slots.length }
    } catch (error) {
      await client.query("rollback")
      throw error
    } finally {
      client.release()
    }
  }

  async createBlock(userId: string, input: { startsAt: string; endsAt: string; reason?: string }) {
    const provider = await this.providerForUser(userId)
    const result = await this.database.pool.query(
      `insert into availability_blocks (provider_id, starts_at, ends_at, reason)
       values ($1, $2, $3, $4) returning *`,
      [provider.id, input.startsAt, input.endsAt, input.reason ?? null]
    )
    return result.rows[0]
  }

  async listMine(userId: string) {
    const provider = await this.providerForUser(userId)
    const [weekly, blocks] = await Promise.all([
      this.database.pool.query(
        "select * from weekly_availability where provider_id = $1 order by weekday, start_time",
        [provider.id]
      ),
      this.database.pool.query(
        "select * from availability_blocks where provider_id = $1 and ends_at >= now() order by starts_at",
        [provider.id]
      )
    ])
    return { weekly: weekly.rows, blocks: blocks.rows }
  }

  async slots(providerId: string, date: string) {
    const weekday = new Date(`${date}T12:00:00.000Z`).getUTCDay()
    const [weekly, blocks, appointments] = await Promise.all([
      this.database.pool.query(
        `select start_time, end_time from weekly_availability
         where provider_id = $1 and weekday = $2 order by start_time`,
        [providerId, weekday]
      ),
      this.database.pool.query(
        `select starts_at, ends_at from availability_blocks
         where provider_id = $1 and starts_at < ($2::date + interval '1 day')
           and ends_at >= $2::date`,
        [providerId, date]
      ),
      this.database.pool.query(
        `select scheduled_for from appointments
         where provider_id = $1 and scheduled_for >= $2::date
           and scheduled_for < ($2::date + interval '1 day')
           and status in ('pending', 'confirmed')`,
        [providerId, date]
      )
    ])

    const blocked = [
      ...blocks.rows.map((row) => ({
        startsAt: new Date(row.starts_at).toISOString(),
        endsAt: new Date(row.ends_at).toISOString()
      })),
      ...appointments.rows.map((row) => {
        const startsAt = new Date(row.scheduled_for)
        return {
          startsAt: startsAt.toISOString(),
          endsAt: new Date(startsAt.getTime() + 60 * 60 * 1000).toISOString()
        }
      })
    ]

    return weekly.rows.flatMap((row) =>
      generateHourlySlots({
        date,
        timeZone: "America/Sao_Paulo",
        startTime: row.start_time,
        endTime: row.end_time,
        blocked
      })
    )
  }

  private async providerForUser(userId: string) {
    const result = await this.database.pool.query(
      "select id from provider_profiles where user_id = $1",
      [userId]
    )
    if (!result.rows[0]) throw new NotFoundException("Perfil profissional nao encontrado.")
    return result.rows[0] as { id: string }
  }
}
