import { Injectable, NotFoundException } from "@nestjs/common"
import type { ProviderProfileInput } from "@maridao/shared"
import { DatabaseService } from "../database/database.service"
import { MapboxService } from "../mapbox/mapbox.service"

@Injectable()
export class ProvidersService {
  constructor(
    private readonly database: DatabaseService,
    private readonly mapbox: MapboxService
  ) {}

  async getMine(userId: string) {
    const result = await this.database.pool.query(
      `select pp.*, p.avatar_url,
        coalesce(json_agg(distinct jsonb_build_object('id', sc.id, 'name', sc.name, 'slug', sc.slug))
          filter (where sc.id is not null), '[]') as categories
       from provider_profiles pp
       join profiles p on p.id = pp.user_id
       left join provider_category_links pcl on pcl.provider_id = pp.id
       left join service_categories sc on sc.id = pcl.category_id
       where pp.user_id = $1
       group by pp.id, p.avatar_url`,
      [userId]
    )
    if (!result.rows[0]) throw new NotFoundException("Perfil profissional nao encontrado.")
    return result.rows[0]
  }

  async upsertMine(userId: string, input: ProviderProfileInput) {
    const coordinates =
      input.latitude !== undefined && input.longitude !== undefined
        ? { latitude: input.latitude, longitude: input.longitude }
        : await this.mapbox.geocode(
            `${input.street ?? ""}, ${input.number ?? ""}, ${input.city} - ${input.state}, ${input.cep}`
          )
    const client = await this.database.pool.connect()
    try {
      await client.query("begin")
      const result = await client.query(
        `insert into provider_profiles (
          user_id, display_name, whatsapp, bio, base_price_cents, cep, street, number,
          neighborhood, city, state, location, work_radius_km, status, updated_at
        ) values (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
          ST_SetSRID(ST_MakePoint($12, $13), 4326)::geography, $14, 'pending', now()
        )
        on conflict (user_id) do update set
          display_name = excluded.display_name,
          whatsapp = excluded.whatsapp,
          bio = excluded.bio,
          base_price_cents = excluded.base_price_cents,
          cep = excluded.cep,
          street = excluded.street,
          number = excluded.number,
          neighborhood = excluded.neighborhood,
          city = excluded.city,
          state = excluded.state,
          location = excluded.location,
          work_radius_km = excluded.work_radius_km,
          status = case when provider_profiles.status = 'suspended' then 'suspended'::provider_status
                        else 'pending'::provider_status end,
          updated_at = now()
        returning id, status`,
        [
          userId,
          input.displayName,
          input.whatsapp,
          input.bio ?? null,
          input.basePriceCents ?? null,
          input.cep.replace(/\D/g, ""),
          input.street ?? null,
          input.number ?? null,
          input.neighborhood ?? null,
          input.city,
          input.state,
          coordinates.longitude,
          coordinates.latitude,
          input.workRadiusKm
        ]
      )
      const providerId = result.rows[0].id as string

      await client.query("delete from provider_category_links where provider_id = $1", [providerId])
      await client.query(
        `insert into provider_category_links (provider_id, category_id)
         select $1, id from service_categories where id = any($2::uuid[])`,
        [providerId, input.serviceCategoryIds]
      )
      await client.query("commit")
      return { id: providerId, status: result.rows[0].status }
    } catch (error) {
      await client.query("rollback")
      throw error
    } finally {
      client.release()
    }
  }

  async getPublic(id: string) {
    const result = await this.database.pool.query(
      `select pp.id, pp.display_name, pp.whatsapp, pp.bio, pp.base_price_cents, pp.city,
        pp.state, pp.rating::float, pp.review_count, pp.is_premium, p.avatar_url,
        coalesce(json_agg(distinct jsonb_build_object('id', sc.id, 'name', sc.name, 'slug', sc.slug))
          filter (where sc.id is not null), '[]') as categories
       from provider_profiles pp
       join profiles p on p.id = pp.user_id
       left join provider_category_links pcl on pcl.provider_id = pp.id
       left join service_categories sc on sc.id = pcl.category_id
       where pp.id = $1 and pp.status = 'approved'
       group by pp.id, p.avatar_url`,
      [id]
    )
    if (!result.rows[0]) throw new NotFoundException("Profissional nao encontrado.")
    return result.rows[0]
  }
}
