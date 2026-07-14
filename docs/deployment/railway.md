# Railway

Railway runs the NestJS API from `apps/api`.

## Build settings

- Build command: `pnpm --filter @maridao/api build`
- Start command: `pnpm --filter @maridao/api start`
- Health check path: `/v1/health`

## Required environment variables

Use `.env.example` as the source of truth. Production must include Supabase, Postgres, Stripe, Mapbox, Resend, app URLs and CORS origins.

## Deploy order

1. Apply Drizzle migrations against the Supabase direct connection.
2. Deploy the API.
3. Verify `/v1/health`.
4. Deploy the web app.
5. Run the smoke checklist in `docs/operations/runbook.md`.
