# Maridao Refactor Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Maridao as a monorepo with React + Vite frontend, NestJS backend, Supabase Auth/Postgres, and Stripe Premium subscriptions.

**Architecture:** Replace the current Next.js-oriented structure with a monorepo containing `apps/web`, `apps/api`, and `packages/shared`. Supabase Auth owns identity, NestJS validates Supabase JWTs and owns business rules, and the Vite app consumes the API through typed clients.

**Tech Stack:** React, Vite, TypeScript, NestJS, Supabase Auth, Supabase Postgres, Stripe, Zod, pnpm workspaces.

---

## File Structure

Create or replace these top-level files:

- Create: `pnpm-workspace.yaml`
- Modify: `package.json`
- Create: `.env.example`
- Create: `docs/backend/environment.md`
- Create: `supabase/migrations/0001_initial_schema.sql`
- Create: `supabase/seed.sql`

Create backend:

- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/nest-cli.json`
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/config/env.ts`
- Create: `apps/api/src/common/errors/api-error.ts`
- Create: `apps/api/src/common/filters/http-exception.filter.ts`
- Create: `apps/api/src/auth/auth.module.ts`
- Create: `apps/api/src/auth/current-user.decorator.ts`
- Create: `apps/api/src/auth/supabase-jwt.guard.ts`
- Create: `apps/api/src/auth/roles.decorator.ts`
- Create: `apps/api/src/auth/roles.guard.ts`
- Create: `apps/api/src/supabase/supabase.module.ts`
- Create: `apps/api/src/supabase/supabase.service.ts`
- Create: `apps/api/src/users/users.module.ts`
- Create: `apps/api/src/users/users.controller.ts`
- Create: `apps/api/src/users/users.service.ts`
- Create: `apps/api/src/providers/providers.module.ts`
- Create: `apps/api/src/providers/providers.controller.ts`
- Create: `apps/api/src/providers/providers.service.ts`
- Create: `apps/api/src/search/search.module.ts`
- Create: `apps/api/src/search/search.controller.ts`
- Create: `apps/api/src/search/search.service.ts`
- Create: `apps/api/src/appointments/appointments.module.ts`
- Create: `apps/api/src/appointments/appointments.controller.ts`
- Create: `apps/api/src/appointments/appointments.service.ts`
- Create: `apps/api/src/reviews/reviews.module.ts`
- Create: `apps/api/src/reviews/reviews.controller.ts`
- Create: `apps/api/src/reviews/reviews.service.ts`
- Create: `apps/api/src/billing/billing.module.ts`
- Create: `apps/api/src/billing/billing.controller.ts`
- Create: `apps/api/src/billing/billing.service.ts`
- Create: `apps/api/src/admin/admin.module.ts`
- Create: `apps/api/src/admin/admin.controller.ts`
- Create: `apps/api/src/admin/admin.service.ts`
- Create: `apps/api/src/health/health.controller.ts`
- Create: `apps/api/test/auth.e2e-spec.ts`
- Create: `apps/api/test/providers.e2e-spec.ts`
- Create: `apps/api/test/appointments.e2e-spec.ts`
- Create: `apps/api/test/billing.e2e-spec.ts`

Create frontend:

- Create: `apps/web/package.json`
- Create: `apps/web/index.html`
- Create: `apps/web/vite.config.ts`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/src/main.tsx`
- Create: `apps/web/src/app/router.tsx`
- Create: `apps/web/src/app/app.tsx`
- Create: `apps/web/src/lib/api.ts`
- Create: `apps/web/src/lib/supabase.ts`
- Create: `apps/web/src/features/auth/*`
- Create: `apps/web/src/features/providers/*`
- Create: `apps/web/src/features/search/*`
- Create: `apps/web/src/features/appointments/*`
- Create: `apps/web/src/features/reviews/*`
- Create: `apps/web/src/features/billing/*`
- Create: `apps/web/src/features/admin/*`

Create shared package:

- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/index.ts`
- Create: `packages/shared/src/roles.ts`
- Create: `packages/shared/src/errors.ts`
- Create: `packages/shared/src/schemas/auth.ts`
- Create: `packages/shared/src/schemas/providers.ts`
- Create: `packages/shared/src/schemas/appointments.ts`
- Create: `packages/shared/src/schemas/reviews.ts`
- Create: `packages/shared/src/schemas/billing.ts`
- Create: `packages/shared/src/schemas/admin.ts`

---

### Task 1: Monorepo Foundation

**Files:**
- Create: `pnpm-workspace.yaml`
- Modify: `package.json`
- Create: `.env.example`

- [ ] **Step 1: Replace the root package scripts**

Update root `package.json` to this structure while preserving repository metadata if added later:

```json
{
  "name": "maridao",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "pnpm --parallel --filter @maridao/web --filter @maridao/api dev",
    "dev:web": "pnpm --filter @maridao/web dev",
    "dev:api": "pnpm --filter @maridao/api dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint",
    "test": "pnpm -r test",
    "typecheck": "pnpm -r typecheck"
  },
  "devDependencies": {
    "typescript": "^5.6.3"
  },
  "packageManager": "pnpm@9.12.3"
}
```

- [ ] **Step 2: Add workspace config**

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- [ ] **Step 3: Add environment template**

Create `.env.example`:

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_URL=http://localhost:3001
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PREMIUM_PRICE_ID=
APP_URL=http://localhost:5173
API_PORT=3001
```

- [ ] **Step 4: Verify workspace commands fail for missing packages**

Run: `pnpm install`

Expected: install succeeds.

Run: `pnpm build`

Expected: fails because workspace packages are not created yet.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-workspace.yaml .env.example
git commit -m "chore: initialize maridao monorepo"
```

---

### Task 2: Shared Contracts Package

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/index.ts`
- Create: `packages/shared/src/roles.ts`
- Create: `packages/shared/src/errors.ts`
- Create: `packages/shared/src/schemas/*.ts`

- [ ] **Step 1: Create package metadata**

Create `packages/shared/package.json`:

```json
{
  "name": "@maridao/shared",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "src/index.ts",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "lint": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "vitest": "^2.1.4"
  }
}
```

- [ ] **Step 2: Add role constants**

Create `packages/shared/src/roles.ts`:

```ts
export const roles = ["client", "provider", "admin", "super_admin"] as const
export type Role = (typeof roles)[number]
```

- [ ] **Step 3: Add shared error codes**

Create `packages/shared/src/errors.ts`:

```ts
export const errorCodes = {
  unauthorized: "UNAUTHORIZED",
  forbidden: "FORBIDDEN",
  profileNotFound: "PROFILE_NOT_FOUND",
  providerProfileNotFound: "PROVIDER_PROFILE_NOT_FOUND",
  appointmentConflict: "APPOINTMENT_CONFLICT",
  reviewAlreadyExists: "REVIEW_ALREADY_EXISTS",
  stripeWebhookInvalid: "STRIPE_WEBHOOK_INVALID"
} as const

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes]
```

- [ ] **Step 4: Add provider schemas**

Create `packages/shared/src/schemas/providers.ts`:

```ts
import { z } from "zod"

export const providerProfileSchema = z.object({
  displayName: z.string().min(2).max(120),
  whatsapp: z.string().min(10).max(20),
  bio: z.string().max(1000).optional(),
  basePriceCents: z.number().int().min(0).optional(),
  cep: z.string().min(8).max(9),
  city: z.string().min(2),
  state: z.string().length(2),
  serviceCategoryIds: z.array(z.string().uuid()).min(1),
  workRadiusKm: z.number().int().min(1).max(100)
})

export const providerSearchSchema = z.object({
  categoryId: z.string().uuid().optional(),
  cep: z.string().min(8).max(9).optional(),
  city: z.string().min(2).optional(),
  state: z.string().length(2).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12)
})

export type ProviderProfileInput = z.infer<typeof providerProfileSchema>
export type ProviderSearchInput = z.infer<typeof providerSearchSchema>
```

- [ ] **Step 5: Add appointment schemas**

Create `packages/shared/src/schemas/appointments.ts`:

```ts
import { z } from "zod"

export const createAppointmentSchema = z.object({
  providerId: z.string().uuid(),
  serviceCategoryId: z.string().uuid(),
  scheduledFor: z.string().datetime(),
  notes: z.string().max(1000).optional()
})

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"])
})

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>
export type UpdateAppointmentStatusInput = z.infer<typeof updateAppointmentStatusSchema>
```

- [ ] **Step 6: Export schemas**

Create `packages/shared/src/index.ts`:

```ts
export * from "./roles"
export * from "./errors"
export * from "./schemas/providers"
export * from "./schemas/appointments"
```

- [ ] **Step 7: Verify shared package**

Run: `pnpm --filter @maridao/shared typecheck`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add packages/shared
git commit -m "feat: add shared contracts"
```

---

### Task 3: Supabase Database Schema

**Files:**
- Create: `supabase/migrations/0001_initial_schema.sql`
- Create: `supabase/seed.sql`
- Create: `docs/backend/environment.md`

- [ ] **Step 1: Add initial SQL schema**

Create `supabase/migrations/0001_initial_schema.sql`:

```sql
create extension if not exists "uuid-ossp";

create type public.app_role as enum ('client', 'provider', 'admin', 'super_admin');
create type public.appointment_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type public.review_status as enum ('visible', 'hidden', 'flagged');
create type public.subscription_status as enum ('inactive', 'active', 'past_due', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null,
  name text not null,
  email text not null unique,
  phone text,
  avatar_url text,
  is_blocked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.provider_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  display_name text not null,
  whatsapp text not null,
  bio text,
  base_price_cents integer,
  cep text not null,
  city text not null,
  state char(2) not null,
  work_radius_km integer not null default 20,
  rating numeric(3,2) not null default 0,
  review_count integer not null default 0,
  is_premium boolean not null default false,
  is_approved boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_categories (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.provider_service_categories (
  provider_id uuid not null references public.provider_profiles(id) on delete cascade,
  category_id uuid not null references public.service_categories(id) on delete restrict,
  primary key (provider_id, category_id)
);

create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.client_profiles(id) on delete cascade,
  provider_id uuid not null references public.provider_profiles(id) on delete cascade,
  service_category_id uuid not null references public.service_categories(id) on delete restrict,
  scheduled_for timestamptz not null,
  status public.appointment_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider_id, scheduled_for)
);

create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  appointment_id uuid not null unique references public.appointments(id) on delete cascade,
  client_id uuid not null references public.client_profiles(id) on delete cascade,
  provider_id uuid not null references public.provider_profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  status public.review_status not null default 'visible',
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  provider_id uuid not null unique references public.provider_profiles(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status public.subscription_status not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_audit_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text not null,
  target_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index provider_profiles_search_idx on public.provider_profiles (is_premium desc, rating desc, city, state);
create index provider_categories_category_idx on public.provider_service_categories (category_id);
create index appointments_client_idx on public.appointments (client_id, scheduled_for desc);
create index appointments_provider_idx on public.appointments (provider_id, scheduled_for desc);
create index reviews_provider_idx on public.reviews (provider_id, created_at desc);
```

- [ ] **Step 2: Add seed categories**

Create `supabase/seed.sql`:

```sql
insert into public.service_categories (slug, name) values
  ('eletrica', 'Elétrica'),
  ('hidraulica', 'Hidráulica'),
  ('montagem-moveis', 'Montagem de Móveis'),
  ('pintura', 'Pintura'),
  ('reparos-gerais', 'Reparos Gerais'),
  ('instalacoes', 'Instalações')
on conflict (slug) do nothing;
```

- [ ] **Step 3: Document required env vars**

Create `docs/backend/environment.md` with the same variables from `.env.example` and explain that service role keys are backend-only.

- [ ] **Step 4: Verify SQL manually**

Run in Supabase SQL editor or Supabase CLI:

```bash
supabase db reset
```

Expected: all tables and enums are created, seed categories are inserted.

- [ ] **Step 5: Commit**

```bash
git add supabase docs/backend/environment.md
git commit -m "feat: add supabase schema"
```

---

### Task 4: NestJS API Foundation

**Files:**
- Create: `apps/api/package.json`
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/health/health.controller.ts`
- Create: `apps/api/src/config/env.ts`

- [ ] **Step 1: Create API package**

Create `apps/api/package.json`:

```json
{
  "name": "@maridao/api",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main.js",
    "lint": "eslint \"src/**/*.ts\"",
    "test": "jest",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@maridao/shared": "workspace:*",
    "@nestjs/common": "^10.4.7",
    "@nestjs/config": "^3.3.0",
    "@nestjs/core": "^10.4.7",
    "@nestjs/platform-express": "^10.4.7",
    "@supabase/supabase-js": "^2.45.4",
    "stripe": "^17.3.1",
    "zod": "^3.24.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.5",
    "@nestjs/testing": "^10.4.7",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.8.6",
    "jest": "^29.7.0",
    "ts-jest": "^29.2.5",
    "typescript": "^5.6.3"
  }
}
```

- [ ] **Step 2: Add health endpoint**

Create `apps/api/src/health/health.controller.ts`:

```ts
import { Controller, Get } from "@nestjs/common"

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return { status: "ok" }
  }
}
```

- [ ] **Step 3: Wire app module**

Create `apps/api/src/app.module.ts`:

```ts
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { HealthController } from "./health/health.controller"

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [HealthController]
})
export class AppModule {}
```

- [ ] **Step 4: Bootstrap API**

Create `apps/api/src/main.ts`:

```ts
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix("v1")
  app.enableCors({
    origin: process.env.APP_URL ?? "http://localhost:5173",
    credentials: true
  })
  await app.listen(Number(process.env.API_PORT ?? 3001))
}

bootstrap()
```

- [ ] **Step 5: Verify API**

Run: `pnpm --filter @maridao/api dev`

Open: `http://localhost:3001/v1/health`

Expected:

```json
{ "status": "ok" }
```

- [ ] **Step 6: Commit**

```bash
git add apps/api
git commit -m "feat: add nest api foundation"
```

---

### Task 5: Supabase Auth Guard And Profile Sync

**Files:**
- Create: `apps/api/src/supabase/supabase.service.ts`
- Create: `apps/api/src/auth/supabase-jwt.guard.ts`
- Create: `apps/api/src/auth/current-user.decorator.ts`
- Create: `apps/api/src/users/users.controller.ts`
- Create: `apps/api/src/users/users.service.ts`

- [ ] **Step 1: Add Supabase service**

Create `apps/api/src/supabase/supabase.service.ts`:

```ts
import { Injectable } from "@nestjs/common"
import { createClient, SupabaseClient } from "@supabase/supabase-js"

@Injectable()
export class SupabaseService {
  readonly admin: SupabaseClient

  constructor() {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
      throw new Error("Missing Supabase backend environment variables")
    }

    this.admin = createClient(url, key, {
      auth: { persistSession: false }
    })
  }
}
```

- [ ] **Step 2: Add JWT guard**

Create `apps/api/src/auth/supabase-jwt.guard.ts`:

```ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { SupabaseService } from "../supabase/supabase.service"

@Injectable()
export class SupabaseJwtGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization
    const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null

    if (!token) {
      throw new UnauthorizedException("Missing bearer token")
    }

    const { data, error } = await this.supabase.admin.auth.getUser(token)

    if (error || !data.user) {
      throw new UnauthorizedException("Invalid bearer token")
    }

    request.user = data.user
    return true
  }
}
```

- [ ] **Step 3: Add profile sync endpoint**

Create `apps/api/src/users/users.controller.ts`:

```ts
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { SupabaseJwtGuard } from "../auth/supabase-jwt.guard"
import { UsersService } from "./users.service"

@Controller("me")
@UseGuards(SupabaseJwtGuard)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  getMe(@Req() request: any) {
    return this.users.getProfile(request.user.id)
  }

  @Post("sync")
  sync(@Req() request: any, @Body() body: { role: "client" | "provider"; name: string; phone?: string }) {
    return this.users.syncProfile({
      id: request.user.id,
      email: request.user.email,
      role: body.role,
      name: body.name,
      phone: body.phone
    })
  }
}
```

- [ ] **Step 4: Implement user service**

Create `apps/api/src/users/users.service.ts`:

```ts
import { Injectable, NotFoundException } from "@nestjs/common"
import { SupabaseService } from "../supabase/supabase.service"

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async getProfile(id: string) {
    const { data, error } = await this.supabase.admin.from("profiles").select("*").eq("id", id).single()

    if (error || !data) {
      throw new NotFoundException("Profile not found")
    }

    return data
  }

  async syncProfile(input: { id: string; email: string; role: "client" | "provider"; name: string; phone?: string }) {
    const { data, error } = await this.supabase.admin
      .from("profiles")
      .upsert({
        id: input.id,
        email: input.email,
        role: input.role,
        name: input.name,
        phone: input.phone ?? null
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
}
```

- [ ] **Step 5: Verify profile sync**

Run API and call `POST /v1/me/sync` with a valid Supabase access token.

Expected: `profiles` receives a row matching the Auth user id.

- [ ] **Step 6: Commit**

```bash
git add apps/api/src/supabase apps/api/src/auth apps/api/src/users
git commit -m "feat: validate supabase auth in api"
```

---

### Task 6: Provider Profile Backend

**Files:**
- Create: `apps/api/src/providers/providers.controller.ts`
- Create: `apps/api/src/providers/providers.service.ts`
- Modify: `packages/shared/src/schemas/providers.ts`

- [ ] **Step 1: Write provider profile service**

Implement `upsertMyProfile(userId, input)`, `getPublicProfile(id)`, and `getMyProfile(userId)`.

Use `providerProfileSchema` from `@maridao/shared` for validation before writing to Supabase.

- [ ] **Step 2: Create routes**

Expose:

```txt
GET   /v1/providers/me
PATCH /v1/providers/me
GET   /v1/providers/:id
```

- [ ] **Step 3: Enforce provider ownership**

`PATCH /v1/providers/me` must only update the provider profile whose `user_id` matches the JWT user id.

- [ ] **Step 4: Verify**

Run: `pnpm --filter @maridao/api test -- providers`

Expected: creating and updating a provider profile works, and another user cannot update it.

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/providers packages/shared/src/schemas/providers.ts
git commit -m "feat: add provider profile api"
```

---

### Task 7: Search Backend

**Files:**
- Create: `apps/api/src/search/search.controller.ts`
- Create: `apps/api/src/search/search.service.ts`

- [ ] **Step 1: Implement search query**

Search providers by category, city, state, and CEP where available. Sort by `is_premium desc`, `rating desc`, and `created_at desc`.

- [ ] **Step 2: Return public cards**

Each search result returns:

```ts
{
  id: string
  displayName: string
  city: string
  state: string
  rating: number
  reviewCount: number
  isPremium: boolean
  basePriceCents: number | null
  categories: string[]
}
```

- [ ] **Step 3: Verify**

Run: `pnpm --filter @maridao/api test -- search`

Expected: Premium providers appear before non-premium providers for matching categories.

- [ ] **Step 4: Commit**

```bash
git add apps/api/src/search
git commit -m "feat: add provider search api"
```

---

### Task 8: Appointment Backend

**Files:**
- Create: `apps/api/src/appointments/appointments.controller.ts`
- Create: `apps/api/src/appointments/appointments.service.ts`
- Modify: `packages/shared/src/schemas/appointments.ts`

- [ ] **Step 1: Implement appointment creation**

`POST /v1/appointments` must:
- require a client user
- find `client_profiles.user_id = auth user id`
- validate provider and category
- reject duplicate provider schedule through the unique database constraint
- create a pending appointment

- [ ] **Step 2: Implement appointment listing**

`GET /v1/appointments/me` returns appointments for the current client or provider depending on role.

- [ ] **Step 3: Implement status update**

`PATCH /v1/appointments/:id/status` allows:
- provider: `pending -> confirmed`, `pending -> cancelled`, `confirmed -> completed`, `confirmed -> cancelled`
- client: `pending -> cancelled`
- admin: any status correction

- [ ] **Step 4: Verify**

Run: `pnpm --filter @maridao/api test -- appointments`

Expected: schedule conflicts are rejected and role-based transitions are enforced.

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/appointments packages/shared/src/schemas/appointments.ts
git commit -m "feat: add appointment api"
```

---

### Task 9: Reviews Backend

**Files:**
- Create: `apps/api/src/reviews/reviews.controller.ts`
- Create: `apps/api/src/reviews/reviews.service.ts`
- Create: `packages/shared/src/schemas/reviews.ts`

- [ ] **Step 1: Add review schema**

Create a Zod schema with:

```ts
{
  appointmentId: string
  rating: 1 | 2 | 3 | 4 | 5
  comment?: string
}
```

- [ ] **Step 2: Implement review creation**

Only the appointment client can review, and only completed appointments can be reviewed.

- [ ] **Step 3: Update provider reputation**

After inserting a visible review, recalculate `provider_profiles.rating` and `provider_profiles.review_count`.

- [ ] **Step 4: Verify**

Run: `pnpm --filter @maridao/api test -- reviews`

Expected: duplicate reviews are rejected and provider rating updates.

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/reviews packages/shared/src/schemas/reviews.ts
git commit -m "feat: add reviews api"
```

---

### Task 10: Stripe Premium Backend

**Files:**
- Create: `apps/api/src/billing/billing.controller.ts`
- Create: `apps/api/src/billing/billing.service.ts`
- Create: `packages/shared/src/schemas/billing.ts`

- [ ] **Step 1: Implement checkout session**

`POST /v1/billing/checkout` must:
- require provider role
- find provider profile by JWT user id
- create a Stripe customer if missing
- create a subscription checkout session with `STRIPE_PREMIUM_PRICE_ID`
- return `{ url }`

- [ ] **Step 2: Implement webhook**

`POST /v1/billing/webhook` must verify Stripe signature and handle:

```txt
checkout.session.completed
customer.subscription.updated
customer.subscription.deleted
invoice.payment_failed
```

- [ ] **Step 3: Sync premium**

Set `provider_profiles.is_premium = true` only when subscription status is active.

- [ ] **Step 4: Verify**

Run Stripe CLI:

```bash
stripe listen --forward-to localhost:3001/v1/billing/webhook
```

Run test checkout.

Expected: provider becomes Premium after successful checkout.

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/billing packages/shared/src/schemas/billing.ts
git commit -m "feat: add stripe premium billing"
```

---

### Task 11: Admin Backend

**Files:**
- Create: `apps/api/src/admin/admin.controller.ts`
- Create: `apps/api/src/admin/admin.service.ts`
- Create: `packages/shared/src/schemas/admin.ts`

- [ ] **Step 1: Add role guards**

Create `RolesGuard` so `admin` and `super_admin` can access admin routes.

- [ ] **Step 2: Add user management**

Expose:

```txt
GET   /v1/admin/users
PATCH /v1/admin/users/:id/status
```

Status patch supports blocking and unblocking users.

- [ ] **Step 3: Add review moderation**

Expose:

```txt
GET   /v1/admin/reviews
PATCH /v1/admin/reviews/:id/moderation
```

Moderation supports `visible`, `hidden`, and `flagged`.

- [ ] **Step 4: Add audit logs**

Every admin mutation inserts a row in `admin_audit_logs`.

- [ ] **Step 5: Verify**

Run: `pnpm --filter @maridao/api test -- admin`

Expected: client/provider tokens cannot access admin routes, admin tokens can.

- [ ] **Step 6: Commit**

```bash
git add apps/api/src/admin apps/api/src/auth packages/shared/src/schemas/admin.ts
git commit -m "feat: add admin moderation api"
```

---

### Task 12: Vite Frontend Foundation

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/src/main.tsx`
- Create: `apps/web/src/app/router.tsx`
- Create: `apps/web/src/lib/supabase.ts`
- Create: `apps/web/src/lib/api.ts`

- [ ] **Step 1: Create Vite package**

Create React + Vite + TypeScript app under `apps/web`.

- [ ] **Step 2: Add Supabase client**

`apps/web/src/lib/supabase.ts` reads:

```ts
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

- [ ] **Step 3: Add authenticated API helper**

`apps/web/src/lib/api.ts` attaches the current Supabase access token to API requests.

- [ ] **Step 4: Build routes**

Add public, client, provider, and admin route groups. Protected routes redirect to `/login`.

- [ ] **Step 5: Verify**

Run: `pnpm --filter @maridao/web dev`

Expected: Vite app loads and route navigation works.

- [ ] **Step 6: Commit**

```bash
git add apps/web
git commit -m "feat: add vite frontend foundation"
```

---

### Task 13: Frontend Feature Migration

**Files:**
- Create: `apps/web/src/features/auth/*`
- Create: `apps/web/src/features/providers/*`
- Create: `apps/web/src/features/search/*`
- Create: `apps/web/src/features/appointments/*`
- Create: `apps/web/src/features/reviews/*`
- Create: `apps/web/src/features/billing/*`
- Create: `apps/web/src/features/admin/*`

- [ ] **Step 1: Auth screens**

Recreate login and register flows using Supabase Auth. After registration, call `POST /v1/me/sync`.

- [ ] **Step 2: Provider profile screens**

Create provider profile editor connected to `GET/PATCH /v1/providers/me`.

- [ ] **Step 3: Search screens**

Create search form and results connected to `GET /v1/providers/search`.

- [ ] **Step 4: Public provider page**

Show provider details, reviews, WhatsApp button, and appointment button.

- [ ] **Step 5: WhatsApp link**

Generate:

```ts
const message = `Olá, encontrei seu perfil no Maridão e gostaria de falar sobre ${serviceName}.`
const href = `https://wa.me/55${digitsOnlyWhatsapp}?text=${encodeURIComponent(message)}`
```

- [ ] **Step 6: Appointment screens**

Create appointment request form, client appointment list, and provider agenda.

- [ ] **Step 7: Review screens**

Allow clients to review completed appointments exactly once.

- [ ] **Step 8: Premium screen**

Call `POST /v1/billing/checkout` and redirect to Stripe Checkout.

- [ ] **Step 9: Admin screens**

Create users, providers, reviews, and billing moderation pages.

- [ ] **Step 10: Commit**

```bash
git add apps/web/src/features
git commit -m "feat: migrate maridao frontend features"
```

---

### Task 14: Final Verification And Deployment Prep

**Files:**
- Create: `docs/deployment/vercel.md`
- Create: `docs/deployment/railway.md`
- Modify: `README.md`

- [ ] **Step 1: Run full checks**

Run:

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
```

Expected: all commands pass.

- [ ] **Step 2: Document Vercel frontend env**

Create `docs/deployment/vercel.md` with Vite env vars and build command:

```txt
Root directory: apps/web
Build command: pnpm build
Output directory: dist
```

- [ ] **Step 3: Document Railway backend env**

Create `docs/deployment/railway.md` with backend env vars and start command:

```txt
Root directory: apps/api
Build command: pnpm build
Start command: pnpm start
```

- [ ] **Step 4: Update README**

README must describe:
- product pitch
- stack
- local setup
- Supabase setup
- Stripe webhook setup
- dev commands

- [ ] **Step 5: Commit**

```bash
git add README.md docs/deployment
git commit -m "docs: add deployment and local setup"
```

---

## Execution Notes

Implement tasks in order. Do not start frontend feature migration before the corresponding backend endpoint exists. Keep each commit small and runnable. If a task reveals missing product requirements, update the design spec before continuing.

## Self-Review

- Product scope is covered: auth, provider profiles, search, public profiles, WhatsApp, appointments, reviews, Premium, and admin.
- Technical scope is covered: monorepo, shared contracts, Supabase schema, NestJS API, Vite frontend, Stripe webhook, deployment docs.
- No chat, service payment processing, microservices, or Firebase primary database are included.
- The plan is large but ordered so each phase can be built and verified independently.
