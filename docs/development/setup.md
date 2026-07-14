# Desenvolvimento local

## Requisitos

- Node.js 22+
- pnpm 11+
- Docker para Supabase local
- Supabase CLI
- Stripe CLI

## Inicialização

1. Copie `.env.example` para `.env`.
2. Preencha as credenciais dos serviços.
3. Execute `pnpm install`.
4. Execute `pnpm db:migrate` e `pnpm db:seed`.
5. Execute `pnpm dev`.

O frontend usa `http://localhost:5173` e a API usa `http://localhost:3001/v1`.

## Branches

- `master`: produção.
- `codex/*` ou `feat/*`: funcionalidades.
- Pull requests exigem CI verde e revisão.

Nunca envie chaves `service_role`, Stripe ou Resend para o frontend.
