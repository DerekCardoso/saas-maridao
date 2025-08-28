export type TaskStatus = "pending" | "in-progress" | "done" | "blocked"
export type TaskSeverity = "high" | "medium" | "low"

export type LaunchTask = {
  id: string
  category:
    | "Auth & Sessions"
    | "Database & Supabase"
    | "RLS & Segurança"
    | "CRUD & Formulários"
    | "Notificações & Tempo Real"
    | "Pagamentos"
    | "Descoberta & Busca"
    | "Mensagens"
    | "Avaliações"
    | "UI/UX & Acessibilidade"
    | "Performance & Observabilidade"
    | "SEO & Marketing"
    | "DevOps & CI/CD"
    | "Legal & Compliance"
    | "Dados & Migrações"
    | "Operações"
  title: string
  description?: string
  severity: TaskSeverity
  status: TaskStatus
  links?: { label: string; href: string }[]
}

export const launchTasks: LaunchTask[] = [
  // Auth & Sessions
  {
    id: "auth-01",
    category: "Auth & Sessions",
    title: "Definir estratégia final de autenticação (Supabase Auth vs. auth custom)",
    description:
      "Migrar para Supabase Auth (recomendado) para que as políticas RLS funcionem por sessão e simplificar proteção de rotas. Alternativa: manter auth custom com cookies e reforçar políticas públicas.",
    severity: "high",
    status: "pending",
  },
  {
    id: "auth-02",
    category: "Auth & Sessions",
    title: "Unificar proteção de rotas com Server Components/Route Handlers",
    description:
      "Garantir que as páginas protegidas leiam a sessão do usuário no servidor. Se usar Supabase Auth, usar createServerClient para validar sessão e tipo de usuário.",
    severity: "high",
    status: "pending",
  },

  // Database & Supabase
  {
    id: "db-01",
    category: "Database & Supabase",
    title: "Conferir variáveis de ambiente de produção",
    description:
      "NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY presentes no projeto Vercel (Production/Preview).",
    severity: "high",
    status: "in-progress",
  },
  {
    id: "db-02",
    category: "Database & Supabase",
    title: "Remover chaves hardcoded do repositório",
    description:
      "Garantir que não existam chaves sensíveis no código. Conferir lib/supabase.ts e configurações antigas.",
    severity: "high",
    status: "done",
  },
  {
    id: "db-03",
    category: "Database & Supabase",
    title: "Verificar endpoint de saúde do Supabase",
    description: "Acessar GET /api/supabase/health no deploy para validar conectividade e permissões mínimas.",
    severity: "medium",
    status: "pending",
    links: [{ label: "Health", href: "/api/supabase/health" }],
  },

  // RLS & Segurança
  {
    id: "rls-01",
    category: "RLS & Segurança",
    title: "Políticas RLS para leitura pública (providers, specialties, perfis mínimos)",
    description:
      "Permitir listagem de prestadores e especialidades para usuários não autenticados sem expor PII. Usar views se necessário.",
    severity: "high",
    status: "pending",
  },
  {
    id: "rls-02",
    category: "RLS & Segurança",
    title: "Restringir escrita e leitura sensível (appointments, messages, notifications)",
    description:
      "Somente o dono pode ler/escrever seus registros. Validar todas as operações com RLS e/ou mover para Route Handlers com admin client.",
    severity: "high",
    status: "pending",
  },
  {
    id: "sec-01",
    category: "RLS & Segurança",
    title: "Rate limiting e validação de entrada nos endpoints",
    description: "Adicionar limitações por IP/usuário e validação (zod) para evitar abuso e dados malformados.",
    severity: "medium",
    status: "pending",
  },

  // CRUD & Formulários
  {
    id: "crud-01",
    category: "CRUD & Formulários",
    title: "Validação completa no registro com schema (zod) + mensagens por campo",
    description:
      "Cobrir email único, senha forte, telefone/CEP válidos e estados de erro do Supabase. Mostrar toasts e inline errors.",
    severity: "high",
    status: "in-progress",
  },
  {
    id: "crud-02",
    category: "CRUD & Formulários",
    title: "Toasts para todas as operações CRUD (create/update/delete)",
    description: "Padronizar sucesso/erro/aviso e feedback de loading.",
    severity: "medium",
    status: "in-progress",
  },

  // Notificações & Tempo Real
  {
    id: "rt-01",
    category: "Notificações & Tempo Real",
    title: "Notificações persistentes (Supabase Realtime + storage local)",
    description:
      "Inscrever-se em canais por usuário e persistir notificações não lidas. Badge de contagem e marcação de lidas.",
    severity: "high",
    status: "pending",
  },
  {
    id: "rt-02",
    category: "Notificações & Tempo Real",
    title: "Temas nos toasts (success, warning, info, destructive)",
    description: "Padronizar variantes e garantir acessibilidade das cores.",
    severity: "low",
    status: "in-progress",
  },

  // Pagamentos
  {
    id: "pay-01",
    category: "Pagamentos",
    title: "Integração de pagamentos para Plano Premium",
    description:
      "Stripe/Asaas/Pagar.me: checkout, assinatura, webhooks, sincronização de status e gating de recursos premium.",
    severity: "high",
    status: "pending",
  },
  {
    id: "pay-02",
    category: "Pagamentos",
    title: "Webhooks e painel de cobrança",
    description: "Persistir eventos de billing e exibir faturas/planos no dashboard do prestador.",
    severity: "medium",
    status: "pending",
  },

  // Descoberta & Busca
  {
    id: "search-01",
    category: "Descoberta & Busca",
    title: "Página de comparação de prestadores",
    description: "Selecionar 2-3 perfis, comparar rating, preço, distância, disponibilidade, premium badge e reviews.",
    severity: "medium",
    status: "pending",
  },
  {
    id: "search-02",
    category: "Descoberta & Busca",
    title: "Melhorias na busca (filtros por CEP, especialidade, premium primeiro)",
    description: "Ordenação e filtragem no servidor com paginação.",
    severity: "medium",
    status: "pending",
  },

  // Mensagens
  {
    id: "msg-01",
    category: "Mensagens",
    title: "Chat em tempo real (leitura/entrega, tipando...)",
    description: "Canais por par usuário, indicadores de online, mensagens lidas, preview no dashboard.",
    severity: "medium",
    status: "pending",
  },

  // Avaliações
  {
    id: "rev-01",
    category: "Avaliações",
    title: "Fluxo robusto de pós-serviço (review + denúncia/spam)",
    description: "Apoiar edição de review em janela curta e mecanismo de denúncia.",
    severity: "low",
    status: "pending",
  },

  // UI/UX & Acessibilidade
  {
    id: "ux-01",
    category: "UI/UX & Acessibilidade",
    title: "Tema escuro com toggle persistente",
    description: "Aplicar tema dark em todas as páginas e componentes.",
    severity: "medium",
    status: "pending",
  },
  {
    id: "ux-02",
    category: "UI/UX & Acessibilidade",
    title: "Responsividade completa (mobile-first) e testes manuais",
    description: "Validar em iOS/Android e breakpoints principais.",
    severity: "high",
    status: "in-progress",
  },
  {
    id: "ux-03",
    category: "UI/UX & Acessibilidade",
    title: "Acessibilidade (aria-labels, foco, contraste, skip links)",
    description: "Passar em uma auditoria básica (Lighthouse ~90+ A11y).",
    severity: "medium",
    status: "pending",
  },

  // Performance & Observabilidade
  {
    id: "perf-01",
    category: "Performance & Observabilidade",
    title: "Lazy loading e caching estratégico",
    description: "Evitar overfetching, usar suspense onde for seguro, cache para listas e imagens otimizadas.",
    severity: "medium",
    status: "pending",
  },
  {
    id: "obs-01",
    category: "Performance & Observabilidade",
    title: "Error boundaries e monitoramento (Sentry)",
    description: "error.tsx por segmento crítico, captura de erros client/server e alertas.",
    severity: "high",
    status: "pending",
  },
  {
    id: "obs-02",
    category: "Performance & Observabilidade",
    title: "Logs estruturados e métricas",
    description: "Logs de negócio (agendamento, pagamento) e dashboards.",
    severity: "low",
    status: "pending",
  },

  // SEO & Marketing
  {
    id: "seo-01",
    category: "SEO & Marketing",
    title: "Metadados, Open Graph, sitemap e robots",
    description: "Cover image OG, titles/descrições por página, /sitemap.xml e /robots.txt.",
    severity: "medium",
    status: "pending",
  },
  {
    id: "seo-02",
    category: "SEO & Marketing",
    title: "Analytics & Pixel",
    description: "Configurar GA4/Meta Pixel e eventos-chave (registro, agendamento, compra premium).",
    severity: "low",
    status: "pending",
  },

  // DevOps & CI/CD
  {
    id: "devops-01",
    category: "DevOps & CI/CD",
    title: "CI com typecheck, lint, testes e preview links",
    description: "GitHub Actions: pnpm build, pnpm test, ESLint, Playwright (smoke).",
    severity: "medium",
    status: "pending",
  },
  {
    id: "devops-02",
    category: "DevOps & CI/CD",
    title: "Configurar variáveis em ambientes (Dev/Preview/Prod)",
    description: "Evitar divergências; revisar chaves do Supabase e webhooks.",
    severity: "high",
    status: "in-progress",
  },

  // Legal & Compliance
  {
    id: "legal-01",
    category: "Legal & Compliance",
    title: "Política de Privacidade, Termos e Consentimento de Cookies",
    description: "Páginas dedicadas, banner de cookies e formulário de contato/DPO.",
    severity: "medium",
    status: "pending",
  },
  {
    id: "legal-02",
    category: "Legal & Compliance",
    title: "Fluxo de exclusão/portabilidade de dados (LGPD)",
    description: "Página para solicitação e instruções internas de atendimento.",
    severity: "low",
    status: "pending",
  },

  // Dados & Migrações
  {
    id: "data-01",
    category: "Dados & Migrações",
    title: "Seeds e migrações reproduzíveis",
    description: "Scripts para criar usuários de teste, prestadores, agendas e notificações.",
    severity: "low",
    status: "done",
  },
  {
    id: "data-02",
    category: "Dados & Migrações",
    title: "Backups e restauração",
    description: "Snapshots no Supabase e procedimento de recuperação.",
    severity: "low",
    status: "pending",
  },

  // Operações
  {
    id: "ops-01",
    category: "Operações",
    title: "Uptime e alertas",
    description: "Health checks, alertas de erro/latência, canal de incidentes.",
    severity: "medium",
    status: "pending",
  },
]
