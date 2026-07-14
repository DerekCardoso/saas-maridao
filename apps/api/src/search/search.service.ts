import { Injectable } from "@nestjs/common"
import type { PaginatedResponse, ProviderSearchInput } from "@maridao/shared"
import { DatabaseService } from "../database/database.service"

@Injectable()
export class SearchService {
  constructor(private readonly database: DatabaseService) {}

  async search(input: ProviderSearchInput): Promise<PaginatedResponse<Record<string, unknown>>> {
    const offset = (input.page - 1) * input.limit
    const parameters = [
      input.categoryId ?? null,
      input.query ?? null,
      input.longitude ?? null,
      input.latitude ?? null,
      input.radiusKm * 1000,
      input.limit,
      offset
    ]

    const result = await this.database.pool.query(
      `with filtered as (
        select pp.id, pp.display_name as "displayName", pp.whatsapp, pp.city, pp.state,
          pp.rating::float, pp.review_count as "reviewCount",
          pp.is_premium as "isPremium", pp.base_price_cents as "basePriceCents",
          p.avatar_url as "avatarUrl", p.last_active_at,
          case when $3::float is null then null else
            ST_Distance(pp.location, ST_SetSRID(ST_MakePoint($3, $4), 4326)::geography) / 1000
          end as "distanceKm",
          coalesce(json_agg(distinct jsonb_build_object('id', sc.id, 'name', sc.name, 'slug', sc.slug))
            filter (where sc.id is not null), '[]') as categories
        from provider_profiles pp
        join profiles p on p.id = pp.user_id and p.is_blocked = false
        left join provider_category_links pcl on pcl.provider_id = pp.id
        left join service_categories sc on sc.id = pcl.category_id
        where pp.status = 'approved'
          and ($1::uuid is null or pcl.category_id = $1)
          and ($2::text is null or pp.display_name ilike '%' || $2 || '%' or sc.name ilike '%' || $2 || '%')
          and ($3::float is null or ST_DWithin(
            pp.location,
            ST_SetSRID(ST_MakePoint($3, $4), 4326)::geography,
            $5
          ))
        group by pp.id, p.avatar_url, p.last_active_at
      )
      select *, count(*) over()::int as total
      from filtered
      order by "isPremium" desc, rating desc, "reviewCount" desc, "distanceKm" asc nulls last,
        last_active_at desc
      limit $6 offset $7`,
      parameters
    )

    const total = Number(result.rows[0]?.total ?? 0)
    return {
      data: result.rows.map((row) => {
        const item = { ...row }
        delete item.total
        return item
      }),
      pagination: {
        page: input.page,
        limit: input.limit,
        total,
        totalPages: Math.ceil(total / input.limit)
      }
    }
  }
}
