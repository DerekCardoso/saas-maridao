import { Injectable, NotFoundException } from "@nestjs/common"
import { createClient } from "@supabase/supabase-js"
import type { AuthUser, } from "../auth/auth-user"
import { DatabaseService } from "../database/database.service"
import { ReviewsService } from "../reviews/reviews.service"

@Injectable()
export class AdminService {
  private readonly supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    { auth: { persistSession: false } }
  )

  constructor(
    private readonly database: DatabaseService,
    private readonly reviews: ReviewsService
  ) {}

  async metrics() {
    const result = await this.database.pool.query(
      `select
        (select count(*)::int from profiles) as users,
        (select count(*)::int from provider_profiles where status = 'pending') as pending_providers,
        (select count(*)::int from appointments) as appointments,
        (select count(*)::int from reviews where status = 'flagged') as flagged_reviews,
        (select count(*)::int from subscriptions where status in ('active', 'trialing')) as premium`
    )
    return result.rows[0]
  }

  async listUsers(page = 1, limit = 25) {
    const result = await this.database.pool.query(
      `select *, count(*) over()::int as total from profiles
       order by created_at desc limit $1 offset $2`,
      [limit, (page - 1) * limit]
    )
    return result.rows
  }

  async listProviders(status?: string) {
    const result = await this.database.pool.query(
      `select pp.*, p.email, p.name, p.avatar_url
       from provider_profiles pp join profiles p on p.id = pp.user_id
       where ($1::provider_status is null or pp.status = $1)
       order by pp.created_at desc`,
      [status ?? null]
    )
    return result.rows
  }

  async moderateProvider(
    admin: AuthUser,
    providerId: string,
    input: { status: "approved" | "rejected" | "suspended"; reason: string }
  ) {
    const result = await this.database.pool.query(
      `update provider_profiles set status = $1, moderation_reason = $2, updated_at = now()
       where id = $3 returning user_id`,
      [input.status, input.reason, providerId]
    )
    if (!result.rows[0]) throw new NotFoundException("Profissional nao encontrado.")
    await this.audit(admin.id, "provider.moderate", "provider_profiles", providerId, input)
    return { updated: true }
  }

  async blockUser(admin: AuthUser, userId: string, blocked: boolean, reason: string) {
    await this.database.pool.query(
      "update profiles set is_blocked = $1, updated_at = now() where id = $2",
      [blocked, userId]
    )
    await this.supabase.auth.admin.updateUserById(userId, {
      ban_duration: blocked ? "876000h" : "none"
    })
    await this.audit(admin.id, blocked ? "user.block" : "user.unblock", "profiles", userId, {
      reason
    })
    return { updated: true }
  }

  async listReviews(status?: string) {
    const result = await this.database.pool.query(
      `select r.*, client_user.name as client_name, pp.display_name as provider_name
       from reviews r
       join client_profiles cp on cp.id = r.client_id
       join profiles client_user on client_user.id = cp.user_id
       join provider_profiles pp on pp.id = r.provider_id
       where ($1::review_status is null or r.status = $1)
       order by r.created_at desc`,
      [status ?? null]
    )
    return result.rows
  }

  async moderateReview(
    admin: AuthUser,
    reviewId: string,
    input: { status: "visible" | "flagged" | "hidden"; reason: string }
  ) {
    const result = await this.database.pool.query(
      `update reviews set status = $1, moderation_reason = $2, updated_at = now()
       where id = $3 returning provider_id`,
      [input.status, input.reason, reviewId]
    )
    if (!result.rows[0]) throw new NotFoundException("Avaliacao nao encontrada.")
    await this.reviews.recalculate(this.database.pool, result.rows[0].provider_id)
    await this.audit(admin.id, "review.moderate", "reviews", reviewId, input)
    return { updated: true }
  }

  async listSubscriptions() {
    const result = await this.database.pool.query(
      `select s.*, pp.display_name, p.email
       from subscriptions s
       join provider_profiles pp on pp.id = s.provider_id
       join profiles p on p.id = pp.user_id
       order by s.updated_at desc`
    )
    return result.rows
  }

  async overridePremium(admin: AuthUser, providerId: string, enabled: boolean, reason: string) {
    await this.database.pool.query(
      `insert into subscriptions (provider_id, override_enabled, override_reason)
       values ($1, $2, $3)
       on conflict (provider_id) do update set
         override_enabled = excluded.override_enabled,
         override_reason = excluded.override_reason,
         updated_at = now()`,
      [providerId, enabled, reason]
    )
    await this.database.pool.query(
      `update provider_profiles set is_premium =
        case when $2 then true else exists (
          select 1 from subscriptions s where s.provider_id = $1
            and s.status in ('active', 'trialing')
        ) end
       where id = $1`,
      [providerId, enabled]
    )
    await this.audit(admin.id, "premium.override", "subscriptions", providerId, {
      enabled,
      reason
    })
    return { updated: true }
  }

  private async audit(
    adminUserId: string,
    action: string,
    targetTable: string,
    targetId: string,
    metadata: Record<string, unknown>
  ) {
    await this.database.pool.query(
      `insert into admin_audit_logs (admin_user_id, action, target_table, target_id, metadata)
       values ($1, $2, $3, $4, $5)`,
      [adminUserId, action, targetTable, targetId, metadata]
    )
  }
}
