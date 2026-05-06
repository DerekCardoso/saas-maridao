# Maridao Refactor Design

**Goal:** Rebuild Maridao as a clean marketplace platform using React + Vite, NestJS, Supabase Auth/Postgres, and Stripe Premium subscriptions.

**Decision:** The current Next.js project is treated as a product and UI reference, not as the final architecture. The refactor replaces the app structure with a monorepo that separates frontend, backend, and shared contracts.

---

## Product Context

Maridao connects customers with local home-service professionals such as electricians, plumbers, assemblers, painters, and general repair providers.

The platform does not intermediate service payments. Customers find providers, inspect reputation, contact them through WhatsApp, and negotiate directly. The business model is a monthly Premium subscription for providers who want better visibility, a Premium badge, and higher ranking in search results.

## User Roles

**Client**
- Registers and logs in.
- Searches providers by category and location.
- Views provider profiles and reviews.
- Contacts providers through WhatsApp.
- Requests appointments.
- Reviews providers after completed services.

**Provider**
- Registers and logs in.
- Creates and edits a professional profile.
- Defines services, base price, work area, WhatsApp number, bio, and photo.
- Receives and manages appointment requests.
- Receives reviews.
- Subscribes to Premium.

**Admin**
- Lists users and providers.
- Blocks or unblocks accounts.
- Moderates reviews.
- Manages Premium state when needed.
- Views basic platform metrics.

**Super Admin**
- Has full admin access.
- Can manage critical settings and billing-related overrides.
- This role is modeled now, even if only one account uses it during MVP.

## Architecture

Use a monorepo:

```txt
apps/
  web/
    React + Vite + TypeScript
  api/
    NestJS + TypeScript
packages/
  shared/
    shared DTO schemas, role constants, API contracts, formatting helpers
```

Frontend and backend communicate through HTTP JSON APIs. Supabase Auth owns user authentication. The web app stores the Supabase session client-side and sends the access token to the NestJS API in the `Authorization: Bearer <token>` header.

NestJS validates Supabase JWTs, enforces role-based authorization, executes business rules, and reads/writes Supabase Postgres through the Supabase service role client or a Postgres query layer.

Supabase provides:
- Auth
- Postgres
- Storage for provider profile images

Stripe provides:
- Premium checkout
- Subscription lifecycle
- Webhooks for activation, renewal, cancellation, and payment failure

WhatsApp MVP uses direct `wa.me` links with prefilled messages. No chat module is included in the MVP.

## Backend Modules

```txt
auth
users
clients
providers
service-categories
search
appointments
reviews
billing
admin
notifications
health
```

## Data Model

Core tables:

```txt
profiles
client_profiles
provider_profiles
service_categories
provider_services
provider_service_categories
provider_areas
appointments
reviews
subscriptions
admin_audit_logs
```

`profiles.id` maps to the Supabase Auth user id. Role-specific tables extend the base profile.

Provider search prioritizes:
1. Premium providers
2. Higher rating
3. Providers matching category
4. Providers matching area
5. Recently active providers

Distance can start with CEP/city/state filtering in the MVP. Geospatial radius search can be added later with PostGIS after the MVP is stable.

## Frontend Application

The Vite app has these route groups:

```txt
/
/login
/register
/search
/providers/:id
/client
/client/appointments
/client/reviews
/provider
/provider/profile
/provider/appointments
/provider/premium
/admin
/admin/users
/admin/providers
/admin/reviews
/admin/billing
```

The current Next.js pages and components should be used as visual and workflow references, but new code should be organized by feature:

```txt
apps/web/src/features/auth
apps/web/src/features/search
apps/web/src/features/providers
apps/web/src/features/appointments
apps/web/src/features/reviews
apps/web/src/features/billing
apps/web/src/features/admin
apps/web/src/components/ui
apps/web/src/lib
```

## API Contract Style

Use versioned REST endpoints under `/v1`.

Examples:

```txt
POST   /v1/auth/sync-profile
GET    /v1/me
PATCH  /v1/me
GET    /v1/providers/search
GET    /v1/providers/:id
PATCH  /v1/providers/me
POST   /v1/appointments
GET    /v1/appointments/me
PATCH  /v1/appointments/:id/status
POST   /v1/reviews
POST   /v1/billing/checkout
POST   /v1/billing/webhook
GET    /v1/admin/users
PATCH  /v1/admin/users/:id/status
GET    /v1/admin/reviews
PATCH  /v1/admin/reviews/:id/moderation
```

Request and response validation should use Zod schemas in `packages/shared`, with NestJS DTOs generated manually from the same shape or kept structurally aligned.

## Security

- Supabase Auth is the only login provider for MVP.
- NestJS must reject missing or invalid JWTs for protected routes.
- Role checks happen in NestJS guards.
- Admin and Super Admin routes require explicit role checks.
- Stripe webhooks must verify the Stripe signature.
- The Supabase service role key must only exist in backend environment variables.
- Frontend must only receive anon Supabase credentials.

## Error Handling

API errors use a consistent shape:

```json
{
  "code": "PROVIDER_PROFILE_NOT_FOUND",
  "message": "Provider profile not found.",
  "details": {}
}
```

Frontend maps known error codes to Portuguese user-facing messages.

## Testing Strategy

Backend:
- Unit tests for services and guards.
- Integration tests for critical endpoints.
- Stripe webhook tests with signature verification mocked.

Frontend:
- Component tests for forms and auth-driven UI.
- Integration-style tests for critical flows.

Shared:
- Schema tests for DTO validation edge cases.

## MVP Order

1. Monorepo foundation.
2. Supabase schema and local env docs.
3. Backend health, config, auth guard, profile sync.
4. Frontend auth and route protection.
5. Provider profile.
6. Search and public provider profile.
7. WhatsApp contact.
8. Appointments and provider agenda.
9. Reviews.
10. Stripe Premium.
11. Admin panel.
12. Deployment docs and production readiness.

## Explicit Non-Goals For MVP

- No internal chat.
- No service payment processing.
- No complex microservices.
- No Firebase primary database.
- No advanced PostGIS ranking unless simple CEP/city filtering proves insufficient.
- No marketplace commission flow.

## Self-Review

- The design covers the product roles, critical marketplace flows, backend responsibilities, frontend migration, auth, billing, WhatsApp, and admin.
- No implementation placeholder remains.
- The stack is internally consistent: React + Vite, NestJS, Supabase Auth/Postgres, Stripe, Vercel/Railway-compatible deployment.
- The scope is large but decomposed into phases that can be implemented incrementally.
