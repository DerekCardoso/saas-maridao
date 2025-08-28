# Maridão — Checklist de Lançamento

Este documento consolida o que falta para colocar a plataforma no ar de forma segura, escalável e com ótima experiência do usuário.

## 1) Autenticação & Sessão
- [ ] Definir estratégia final (Supabase Auth recomendado) com sessões reais para RLS.
- [ ] Proteger rotas no servidor (Server Components/Route Handlers) lendo a sessão.
- [ ] Remover dependências de cookies custom quando migrar para Supabase Auth.
- [ ] Fluxo de logout consistente e limpeza de storage.

## 2) Banco de Dados & Supabase
- [x] Remover chaves hardcoded do repositório.
- [ ] Validar variáveis em produção (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY).
- [ ] Verificar `/api/supabase/health` após cada deploy.
- [ ] Gerar tipos TS via Supabase CLI e manter atualizados.

## 3) RLS & Segurança
- [ ] Políticas públicas de leitura (lista de prestadores e especialidades) sem expor PII.
- [ ] Políticas estritas para agendamentos, mensagens e notificações (somente donos).
- [ ] Rate limit e validação de entrada (zod) em todas as rotas.
- [ ] Revisão de escopo do service role (uso apenas no servidor).

## 4) CRUD & Formulários
- [ ] Registro com validação de esquema (zod) e erros por campo.
- [ ] Toasts padronizados para create/update/delete + loading states.
- [ ] Verificar unicidade de email e mensagens de erro do Supabase.

## 5) Notificações & Tempo Real
- [ ] Realtime de notificações por usuário, com badge e persistência.
- [ ] Temas de toast (success, warning, info, destructive) acessíveis.

## 6) Pagamentos
- [ ] Implementar provider (Stripe/Asaas/Pagar.me) para Plano Premium.
- [ ] Webhooks confiáveis (assinaturas, cancelamentos, falhas).
- [ ] Sincronizar status de assinatura no dashboard e gating de features.

## 7) Descoberta & Busca
- [ ] Página de comparação de prestadores (até 3) com métricas-chave.
- [ ] Filtros por CEP, especialidade e ordenação premium/nota.

## 8) Mensagens
- [ ] Canais em tempo real, “digitando...”, lido/entregue, contagem de não lidas.

## 9) Avaliações
- [ ] Revisão pós-serviço com edição breve e denúncia de abuso/spam.

## 10) UI/UX & Acessibilidade
- [ ] Tema escuro com toggle persistente.
- [ ] Responsividade completa testada (iOS/Android/breakpoints).
- [ ] Acessibilidade: aria labels, foco, contraste, skip links.

## 11) Performance & Observabilidade
- [ ] Lazy loading, caching e suspense onde seguro.
- [ ] Error boundaries (error.tsx) e Sentry ligado.
- [ ] Logs de negócio e métricas de produto.

## 12) SEO & Marketing
- [ ] Metadados/OG por página, `sitemap.xml`, `robots.txt`.
- [ ] GA4/Meta Pixel e eventos principais (registro, agendamento, premium).
- [ ] Landing/FAQ otimizadas para conversão.

## 13) DevOps & CI/CD
- [ ] GitHub Actions: typecheck, lint, testes (unitário e smoke E2E).
- [ ] Variáveis alinhadas em Dev/Preview/Prod.
- [ ] Padrões de branch/release.

## 14) Legal & Compliance
- [ ] Política de Privacidade, Termos e Cookies (banner).
- [ ] LGPD: exclusão/portabilidade sob demanda e canal de contato (DPO).

## 15) Dados & Migrações
- [x] Seeds reproduzíveis para testes.
- [ ] Backups e plano de restauração.

## 16) Operações
- [ ] Uptime/healthchecks, alertas e runbooks de incidentes.

Abra a página `/launch-readiness` para acompanhar e marcar progresso visualmente.
