# Maridao

Maridao connects clients to local home-service providers without intermediating service payments. Clients search, compare reputation, contact providers through WhatsApp, schedule jobs and leave reviews. Providers manage profile, availability, appointments and a Stripe Premium subscription.

## Stack

- Monorepo: pnpm workspaces
- Web: React, Vite, TypeScript, React Router, TanStack Query, Tailwind
- API: NestJS, TypeScript, Drizzle, Supabase Auth/Postgres/Storage
- Payments: Stripe Checkout, Customer Portal and webhooks
- Integrations: Mapbox, Resend, Sentry
- Deploy: Vercel for web, Railway for API

## Apps

- `apps/web`: customer, provider and admin SPA.
- `apps/api`: REST API under `/v1`.
- `packages/shared`: public enums, schemas, errors, pagination and shared helpers.
- `legacy/next-app`: previous Next.js app kept for reference during migration.

## Local setup

1. Install dependencies: `pnpm install`.
2. Copy `.env.example` into app-specific environment files.
3. Configure Supabase, Stripe, Mapbox and Resend keys.
4. Run migrations: `pnpm db:migrate`.
5. Seed base data: `pnpm db:seed`.
6. Start both apps: `pnpm dev`.

## Quality gates

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`

Deployment and operational notes live under `docs/`.
