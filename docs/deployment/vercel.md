# Vercel

The Vercel project serves `apps/web` as a Vite SPA.

## Build settings

- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm --filter @maridao/web build`
- Output directory: `apps/web/dist`
- Framework preset: Vite

## Required environment variables

- `VITE_API_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SENTRY_DSN` (optional)

## Release check

1. Create a preview deployment for every pull request.
2. Validate login, search, public provider profile and protected redirects.
3. Promote only after the Railway API and Supabase migrations are already live.
