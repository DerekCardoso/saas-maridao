# Maridão — Guia Completo de Funcionalidades e Fluxos

Este documento descreve, de forma prática e detalhada, tudo o que a plataforma Maridão oferece hoje: perfis, jornadas, páginas, componentes, integrações, regras de negócio e como as peças se conectam para entregar valor a clientes e prestadores.

Última atualização: 2025-08-09

## Sumário
- Visão geral
- Perfis de usuário e permissões
- Jornadas por perfil
  - Cliente
  - Prestador
  - Admin
- Funcionalidades por área
  - Autenticação e onboarding
  - Busca e descoberta (CEP, filtros e comparação)
  - Perfil do prestador
  - Agendamentos (cliente e prestador)
  - Mensagens e WhatsApp
  - Avaliações
  - Notificações e toasts
  - Plano Premium
- Páginas e rotas principais
- Componentes principais
- Integrações e serviços
- Dados e regras de negócio (alto nível)
- Acessibilidade, UX, responsividade e performance
- Segurança e privacidade
- Roadmap próximo

---

## Visão geral

O Maridão é uma plataforma para contratar serviços domésticos de forma rápida e direta, conectando clientes a prestadores (maridos de aluguel) sem intermediação de pagamento. O cliente encontra profissionais por CEP e especialidade, verifica o perfil/avaliações e agenda diretamente. O prestador gerencia disponibilidade, atendimentos, relacionamento e pode destacar seu perfil com o Plano Premium.

Pilares:
- Descoberta eficiente (CEP, distância simulada, filtros e ordenação).
- Fluxo de contratação simples (seleção de serviço, data/horário, detalhes).
- Relacionamento direto (chat interno e botão WhatsApp).
- Reputação (avaliações pós-serviço).
- Gestão (dashboards por perfil, histórico e configurações).
- Diferenciação (Plano Premium: destaque, badge e prioridade em listagens).

---

## Perfis de usuário e permissões

- Visitante (não autenticado)
  - Pode buscar prestadores por CEP, filtrar e abrir páginas públicas de prestadores.
  - Pode iniciar fluxo de agendamento/mensagem, mas precisa logar/cadastrar para concluir.

- Cliente
  - Painel com métricas, próximos/agendamentos passados, favoritos, mensagens, avaliações e configurações.
  - Pode agendar serviços e avaliar prestadores após conclusão.

- Prestador
  - Painel com métricas de atendimento e faturamento (indicadores), próximos serviços, histórico e clientes recentes.
  - Gerencia disponibilidade, perfil, avaliações, e configurações (inclui Premium).

- Admin
  - Painel com KPIs globais (usuários, agendamentos, receita, premium).
  - Acesso a relatórios, gestão de usuários, agendamentos e parâmetros do sistema.

---

## Jornadas por perfil

### Jornada do Cliente
1. Acessa a home e pesquisa pelo CEP (com validação via ViaCEP).
2. Na página de busca, filtra por serviço, avaliação mínima, distância e Premium; ordena por relevância/nota/distância.
3. Abre o perfil do prestador, verifica especialidades, disponibilidade, preço indicado e avaliações.
4. Agenda serviço informando serviço, data, horário e detalhes. Se não estiver logado, abre diálogo de login/cadastro.
5. Após a execução, envia avaliação (nota e comentário).
6. Acompanha no dashboard: métricas, próximos, histórico, mensagens e configurações.

### Jornada do Prestador
1. Cadastra-se como prestador (dados pessoais, endereço por CEP, bio, anos de experiência, especialidades).
2. (Opcional) Ativa Plano Premium para destaque e prioridade na busca.
3. Gerencia disponibilidade e responde solicitações (aceitar/rejeitar/reagendar).
4. Acompanha no dashboard: próximos, histórico, clientes recentes, indicadores (serviços concluídos, faturamento estimado).
5. Mantém perfil atualizado e interage via chat/WhatsApp.

### Jornada do Admin
1. Visualiza KPIs no dashboard (usuários, agendamentos, prestadores premium, receita).
2. Consulta usuários recentes e agendamentos recentes.
3. Acessa relatórios, banco de dados (telas administrativas) e configurações.

---

## Funcionalidades por área

### Autenticação e onboarding
- Login: valida credenciais contra Supabase (tabela users, hash com bcrypt) e direciona para o dashboard do tipo de usuário.
- Cadastro: formulário com validação, busca de endereço por CEP, campos de prestador (bio, experiência, especialidades, Premium).
- Proteção de rotas: dashboards e áreas sensíveis exigem autenticação (middleware e verificação em layouts).
- Feedback: toasts de sucesso/erro e mensagens inline nos formulários.

Arquivos-chave:
- app/login/page.tsx, components/auth/login-form.tsx
- app/register/page.tsx, components/auth/register-form.tsx
- lib/services/user-service.ts (createUser, validateUserCredentials)
- lib/viacep.ts (fetchAddressByCep)

### Busca e descoberta (CEP, filtros e comparação)
- Busca por CEP: salva CEP e traz prestadores próximos (distância simulada para demo).
- Filtros: especialidades, avaliação mínima, premium, raio de distância.
- Ordenação: relevância (premium primeiro, depois nota), nota e distância.
- Contagem e estado vazio com reset de filtros.
- (Comparação) Planejado: página de comparação de 2–3 prestadores.

Arquivos-chave:
- app/search/page.tsx (filtros, tabs de ordenação, listagem)
- components/cep-search.tsx, lib/cep-service.ts

### Perfil do prestador
- Página pública com:
  - Nome, badge Premium, rating/contagem, especialidades, localização e tempo médio de resposta.
  - Serviços listados com preço/duração e CTA “Agendar” integrando com formulário.
  - Avaliações recentes e disponibilidade semanal.
  - Ações: Chat (com gate de login) e WhatsApp.

Arquivos-chave:
- app/provider/[id]/page.tsx
- components/provider-review-card.tsx
- components/schedule-service-form.tsx
- components/chat/chat-button.tsx
- components/whatsapp-button.tsx

### Agendamentos
Cliente:
- Solicita agendamento selecionando serviço, data, horário e detalhes.
- Feedback via toast e redirecionamento para /dashboard/client/appointments.

Prestador:
- Visualiza próximos e históricos; aceita, rejeita, reagenda e inicia serviços.
- Métricas no dashboard (ativos, concluídos, clientes atendidos, faturamento estimado).

Arquivos-chave:
- components/schedule-service-form.tsx (formulário de agendamento com gate de login)
- app/dashboard/client/appointments/*.tsx, components/dashboard/client-appointment-card.tsx
- app/dashboard/provider/appointments/*.tsx, components/dashboard/provider-appointment-card.tsx
- lib/services/appointment-service.ts

### Mensagens e WhatsApp
- Chat interno:
  - Botão “Chat” nas listagens/perfil que exige login e redireciona para mensagens com o prestador.
  - Diálogo de autenticação com abas Login/Cadastro.
- WhatsApp:
  - CTA que abre conversa com o prestador no WhatsApp (deep link), facilitando negociação direta.

Arquivos-chave:
- components/chat/chat-button.tsx
- components/whatsapp-button.tsx
- app/dashboard/client/messages/*, components/dashboard/provider-messages-list.tsx

### Avaliações
- Pós-serviço: cliente avalia prestador (1–5 estrelas) e comentário opcional.
- Feedback com toasts; integra contagem e média no perfil e listagens.

Arquivos-chave:
- components/review/review-form.tsx
- componentes de exibição em provider page e dashboards

### Notificações e toasts
- Notificações:
  - Sino com contagem de não lidas, popover com lista, ações de marcar como lida/todas lidas e excluir.
  - Hook de tempo real planejado para persistência (integração Supabase Realtime).
- Toasts:
  - Padrões de sucesso/erro/aviso usados em login, cadastro, busca, agendamento e reviews.

Arquivos-chave:
- components/notifications/notification-bell.tsx
- components/notifications/notification-list.tsx, notification-item.tsx
- hooks/use-real-time-notifications.tsx
- components/ui/use-toast (shadcn/ui)

### Plano Premium
- Prestador pode ativar Premium no cadastro (UI).
- Efeitos na plataforma:
  - Badge de destaque (escudo) no avatar/perfil.
  - Prioridade na ordenação por relevância na busca.
  - Destaque visual nas listagens.

Arquivos-chave:
- components/auth/register-form.tsx (seção Premium)
- app/search/page.tsx (ordenador favorece Premium)
- app/provider/[id]/page.tsx (badge, destaques)

---

## Páginas e rotas principais

Públicas
- / — Home com CTA, busca por CEP, serviços e seção “Como funciona”.
- /search — Busca e resultados com filtros e ordenação.
- /provider/[id] — Perfil público do prestador com agenda e avaliações.
- /login — Autenticação.
- /register — Cadastro (abas Cliente/Prestador).
- /plano-premium — Informações do plano (página institucional).
- /prompt — Prompt de marketing (auxiliar).
- /launch-readiness — Painel interno de readiness (auxiliar).

Cliente (autenticado)
- /client — Dashboard com métricas, próximos, histórico, favoritos.
- /dashboard/client/appointments — Lista de agendamentos.
- /dashboard/client/appointments/[id]/details — Detalhes do agendamento.
- /dashboard/client/appointments/[id]/review — Avaliar serviço.
- /dashboard/client/messages — Mensagens.
- /dashboard/client/profile — Perfil e configurações.

Prestador (autenticado)
- /provider — Dashboard com métricas, próximos, histórico e clientes recentes.
- /dashboard/provider/availability — Gerenciar disponibilidade.
- /dashboard/provider/appointments — Agendamentos.
- /dashboard/provider/messages — Mensagens.
- /dashboard/provider/settings — Configurações (inclui Premium).
- /dashboard/provider/reviews — Avaliações.

Admin (autenticado)
- /admin — Dashboard com KPIs e cards recentes.
- /dashboard/admin/users — Gestão de usuários.
- /dashboard/admin/appointments — Gestão de agendamentos.
- /dashboard/admin/reports — Relatórios.
- /dashboard/admin/settings — Configurações.
- /dashboard/admin/database — Visão administrativa do banco.

---

## Componentes principais (UI e domínio)

- Header/Footer: navegação, CTA, sino de notificações, alternância de contexto.
- CepSearch: entrada de CEP com validação e integração ViaCEP.
- ServiceCard: vitrine de serviços (hover, sem navegação).
- Provider cards: listagem com badge Premium, nota e distância.
- Provider details: tabs (sobre, serviços, avaliações, disponibilidade).
- ScheduleServiceForm: agendamento com data/horário/serviço e gate de login.
- ChatButton: exige login e redireciona para a conversa com o prestador.
- WhatsAppButton: deep link para conversa direta.
- ReviewForm: avaliação com estrelas e comentário.
- NotificationBell e NotificationList: tempo real planejado + persistência.
- Sidebars e dashboards por perfil com métricas contextuais.

---

## Integrações e serviços

- Supabase (Banco de dados e autenticação de usuários)
  - CRUD de usuários, prestadores, endereços, especialidades, agendamentos e avaliações.
  - Validação de credenciais (bcrypt).
  - Políticas RLS planejadas para público (listagens) e dono (dados sensíveis).
- ViaCEP (Endereços)
  - Busca de endereço por CEP no cadastro e formulários.
- shadcn/ui e Tailwind CSS
  - Base visual consistente, acessível e responsiva.
- Lucide React
  - Ícones leves e semânticos.
- Framer Motion
  - Animações leves e acessíveis (introduzidas em pontos-chave).
- WhatsApp Deep Link
  - Integração direta para conversa entre cliente e prestador.

---

## Dados e regras de negócio (alto nível)

Entidades principais (simplificado):
- Users: id, name, email, phone, is_admin, password(hash)
- Addresses: user_id, cep, street, number, complement, neighborhood, city, state
- Providers: user_id, is_premium, bio, experience_years, rating (média), specialties (n:n)
- Appointments: client_id, provider_id, date, service, details, status (pending/confirmed/completed/cancelled)
- Reviews: appointment_id, provider_id, client_id, rating, comment, created_at
- Notifications: user_id, title, body, read_at
- Messages (planejado/implementação parcial de UI): from_user_id, to_user_id, body, read_at, created_at

Regras:
- Ordenação de busca por relevância: premium primeiro, depois por nota.
- Avaliação disponível apenas após conclusão do serviço.
- Notificações e mensagens devem respeitar RLS por dono (apenas remetente/destinatário).
- Dados públicos de prestador em listagens devem evitar PII sensível; endereço agregado (cidade/UF) é suficiente.

---

## Acessibilidade, UX, responsividade e performance

- Acessibilidade:
  - Labels, aria-attributes, foco visível e contraste em componentes críticos.
  - Feedback textual/visual (toasts) e avisos de validação.
- UX:
  - Gate de login em ações sensíveis (chat, agendar).
  - Estados de vazio, loading, erro e success padronizados.
- Responsividade:
  - Layouts mobile-first, grids e stacks adaptativos do xs ao lg+.
- Performance:
  - Listas paginadas/filtradas no cliente (demo) e arquitetura para mover filtros para o servidor.
  - Imagens/ícones otimizados, CSS utilitário e componentes leves.

---

## Segurança e privacidade

- Nunca expor chaves sensíveis no cliente; uso de variáveis NEXT_PUBLIC_* somente para anon key/URL.
- RLS (Row Level Security):
  - Público: leitura limitada (prestadores/especialidades) sem PII.
  - Privado: agendamentos, mensagens, notificações com acesso por dono.
- Operações privilegiadas via server (Route Handlers/Server Actions) quando necessário.
- Hash de senha com bcrypt e validação rigorosa no registro.

---

## Roadmap próximo (alto impacto)

- Autenticação Supabase Auth por sessão (reduz acoplamento de cookies custom e simplifica RLS).
- Realtime completo: mensagens e notificações persistentes com canais por usuário.
- Pagamentos para Plano Premium: checkout, webhooks e gating no dashboard do prestador.
- Comparação de prestadores e filtros/ordenadores no servidor com paginação real.
- SEO (metadados/OG/sitemap/robots) e analytics (GA4/Pixel).
- Observabilidade: Sentry, error boundaries e logs de negócio.

---

## Referências rápidas (arquivos/pastas)

- Páginas públicas: app/page.tsx, app/search/page.tsx, app/provider/[id]/page.tsx
- Auth e registro: components/auth/*, app/login/page.tsx, app/register/page.tsx
- Dashboards:
  - Cliente: app/dashboard/client/*, app/client/page.tsx
  - Prestador: app/dashboard/provider/*, app/provider/page.tsx
  - Admin: app/dashboard/admin/*, app/admin/page.tsx
- Agendamentos/Reviews/Notificações:
  - lib/services/*-service.ts
  - components/review/*, components/notifications/*
- Busca/CEP: components/cep-search.tsx, lib/viacep.ts, lib/cep-service.ts
- UI base: components/ui/* (shadcn/ui), components/header.tsx, components/footer.tsx
- Integração Supabase: lib/supabase.ts, lib/services/user-service.ts
