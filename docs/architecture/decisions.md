# Decisões de arquitetura

- O projeto é um monorepo pnpm.
- O frontend é React + Vite e consome uma API REST NestJS.
- Supabase Auth controla identidade; a API valida JWT por JWKS.
- Drizzle ORM controla schema e consultas no Postgres do Supabase.
- PostGIS calcula distância por raio.
- Stripe Checkout e Customer Portal controlam o Premium.
- Resend envia notificações transacionais.
- WhatsApp é contato direto por `wa.me`; não existe chat interno no MVP.
- O Next.js anterior fica em `legacy/next-app` até a homologação final.
