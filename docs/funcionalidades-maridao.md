# Funcionalidades da Plataforma Maridão

## Visão Geral

A **Plataforma Maridão** é um marketplace digital que conecta clientes a prestadores de serviços domésticos e residenciais. A plataforma oferece uma experiência completa de agendamento, comunicação, pagamento e avaliação de serviços.

## Arquitetura Técnica

- **Frontend**: Next.js 14 com App Router
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **UI**: shadcn/ui + Tailwind CSS
- **Autenticação**: Sistema customizado com cookies + Supabase Auth (em migração)
- **Pagamentos**: Integração planejada com Stripe/PagSeguro
- **Deploy**: Vercel

## Perfis de Usuário

### 1. Cliente
Pessoa física que busca contratar serviços domésticos.

### 2. Prestador de Serviços
Profissional que oferece serviços domésticos na plataforma.

### 3. Administrador
Usuário com acesso total para gerenciar a plataforma.

---

## Funcionalidades por Perfil

## 🏠 **CLIENTE**

### Cadastro e Autenticação
- ✅ Registro com dados pessoais (nome, email, telefone, senha)
- ✅ Validação de CEP com preenchimento automático de endereço (ViaCEP)
- ✅ Login com email/senha
- ✅ Sistema de cookies para manter sessão
- 🔄 Recuperação de senha (planejado)

### Busca e Contratação
- ✅ Busca de prestadores por categoria de serviço
- ✅ Filtros por localização, avaliação e preço
- ✅ Visualização de perfis detalhados dos prestadores
- ✅ Sistema de agendamento com data/hora
- ✅ Especificação de detalhes do serviço
- ✅ Confirmação de endereço para atendimento

### Comunicação
- ✅ Chat interno com prestadores
- ✅ Histórico de conversas
- ✅ Notificações de novas mensagens
- 🔄 Integração WhatsApp (planejado)

### Gestão de Serviços
- ✅ Dashboard com visão geral dos agendamentos
- ✅ Acompanhamento de status dos serviços
- ✅ Histórico completo de serviços contratados
- ✅ Cancelamento de agendamentos
- ✅ Reagendamento de serviços

### Avaliações e Feedback
- ✅ Sistema de avaliação por estrelas (1-5)
- ✅ Comentários sobre o serviço prestado
- ✅ Visualização de avaliações anteriores
- ✅ Histórico de avaliações feitas

### Perfil e Configurações
- ✅ Edição de dados pessoais
- ✅ Gerenciamento de endereços
- ✅ Configurações de notificações
- ✅ Histórico de atividades

---

## 🔧 **PRESTADOR DE SERVIÇOS**

### Cadastro e Perfil
- ✅ Registro com dados profissionais
- ✅ Definição de especialidades/categorias
- ✅ Upload de fotos do perfil
- ✅ Descrição profissional (bio)
- ✅ Definição de anos de experiência
- ✅ Configuração de área de atendimento

### Gestão de Disponibilidade
- ✅ Calendário de disponibilidade
- ✅ Definição de horários de trabalho
- ✅ Bloqueio de datas específicas
- ✅ Configuração de dias da semana disponíveis

### Gestão de Agendamentos
- ✅ Recebimento de solicitações de serviço
- ✅ Aceitar/rejeitar agendamentos
- ✅ Reagendamento de serviços
- ✅ Iniciar execução do serviço
- ✅ Finalizar serviços
- ✅ Dashboard com estatísticas

### Comunicação
- ✅ Chat com clientes
- ✅ Notificações de novos agendamentos
- ✅ Histórico de conversas
- 🔄 Notificações push (planejado)

### Plano Premium
- ✅ Upgrade para conta premium
- ✅ Destaque nos resultados de busca
- ✅ Acesso a funcionalidades exclusivas
- 🔄 Sistema de pagamento do plano (em desenvolvimento)

### Avaliações e Reputação
- ✅ Visualização de avaliações recebidas
- ✅ Cálculo automático de rating médio
- ✅ Histórico de feedback dos clientes
- ✅ Estatísticas de desempenho

---

## ⚙️ **ADMINISTRADOR**

### Gestão de Usuários
- ✅ Listagem de todos os usuários
- ✅ Visualização de perfis detalhados
- ✅ Estatísticas de usuários por tipo
- ✅ Filtros e busca avançada
- 🔄 Suspensão/ativação de contas (planejado)

### Gestão de Agendamentos
- ✅ Visão geral de todos os agendamentos
- ✅ Filtros por status, data, prestador
- ✅ Estatísticas de agendamentos
- ✅ Resolução de conflitos
- 🔄 Cancelamento administrativo (planejado)

### Relatórios e Analytics
- ✅ Dashboard com métricas principais
- ✅ Gráficos de crescimento
- ✅ Relatórios de receita
- ✅ Análise de performance por categoria
- ✅ Exportação de dados

### Configurações do Sistema
- ✅ Configurações gerais da plataforma
- ✅ Gerenciamento de categorias de serviço
- ✅ Configuração de taxas e comissões
- 🔄 Configuração de emails automáticos (planejado)

### Gestão de Conteúdo
- 🔄 Moderação de avaliações (planejado)
- 🔄 Gestão de denúncias (planejado)
- 🔄 Aprovação de prestadores (planejado)

---

## 🌐 **FUNCIONALIDADES GERAIS**

### Páginas Públicas
- ✅ Landing page com apresentação da plataforma
- ✅ Página "Como Funciona"
- ✅ Listagem pública de prestadores
- ✅ Perfis públicos dos prestadores
- ✅ Busca por CEP/localização
- ✅ Página de planos premium

### Sistema de Notificações
- ✅ Notificações em tempo real
- ✅ Histórico de notificações
- ✅ Marcação como lida/não lida
- ✅ Diferentes tipos (agendamento, mensagem, avaliação, sistema)
- 🔄 Notificações por email (planejado)
- 🔄 Notificações push (planejado)

### Integração CEP
- ✅ Busca automática de endereço por CEP
- ✅ Validação de CEP brasileiro
- ✅ Preenchimento automático de campos
- ✅ Integração com API ViaCEP

### Sistema de Toasts
- ✅ Notificações visuais de sucesso/erro
- ✅ Animações suaves
- ✅ Diferentes temas (sucesso, erro, aviso, info)
- ✅ Posicionamento configurável
- ✅ Auto-dismiss configurável

### Responsividade
- ✅ Design responsivo para mobile
- ✅ Navegação adaptativa
- ✅ Componentes otimizados para touch
- 🔄 PWA (Progressive Web App) - planejado

---

## 📊 **DADOS E ESTRUTURAS**

### Entidades Principais
- **Users**: Dados básicos de todos os usuários
- **Clients**: Dados específicos de clientes
- **Providers**: Dados específicos de prestadores
- **Appointments**: Agendamentos de serviços
- **Reviews**: Avaliações e comentários
- **Messages**: Sistema de chat interno
- **Notifications**: Notificações do sistema
- **Addresses**: Endereços dos usuários
- **Provider_Specialties**: Especialidades dos prestadores
- **Provider_Availability**: Disponibilidade dos prestadores
- **Provider_Blocked_Dates**: Datas bloqueadas

### Relacionamentos
- Usuário → Cliente/Prestador (1:1)
- Prestador → Especialidades (1:N)
- Prestador → Disponibilidade (1:N)
- Cliente ↔ Prestador → Agendamentos (N:N)
- Agendamento → Avaliação (1:1)
- Usuário → Endereços (1:N)
- Usuário → Notificações (1:N)
- Usuário ↔ Usuário → Mensagens (N:N)

---

## 🔐 **SEGURANÇA E AUTENTICAÇÃO**

### Autenticação Atual
- ✅ Sistema customizado com cookies
- ✅ Hash de senhas
- ✅ Middleware de proteção de rotas
- ✅ Validação de sessão
- 🔄 Migração para Supabase Auth (em andamento)

### Autorização
- ✅ Controle de acesso por tipo de usuário
- ✅ Proteção de rotas sensíveis
- ✅ Validação de permissões no backend
- 🔄 Row Level Security (RLS) - em implementação

### Validações
- ✅ Validação de formulários no frontend
- ✅ Sanitização de dados
- ✅ Validação de CEP
- ✅ Validação de email
- 🔄 Rate limiting (planejado)

---

## 💳 **SISTEMA DE PAGAMENTOS** (Planejado)

### Para Clientes
- 🔄 Pagamento de serviços via cartão
- 🔄 PIX
- 🔄 Boleto bancário
- 🔄 Carteira digital

### Para Prestadores
- 🔄 Pagamento do plano premium
- 🔄 Recebimento de pagamentos
- 🔄 Relatórios financeiros
- 🔄 Saque automático

### Administração
- 🔄 Gestão de transações
- 🔄 Relatórios financeiros
- 🔄 Configuração de taxas
- 🔄 Controle de comissões

---

## 📱 **INTEGRAÇÕES EXTERNAS**

### APIs Integradas
- ✅ **ViaCEP**: Busca de endereços por CEP
- 🔄 **WhatsApp Business API**: Comunicação externa
- 🔄 **Google Maps**: Localização e rotas
- 🔄 **Stripe/PagSeguro**: Processamento de pagamentos

### Serviços de Terceiros
- ✅ **Supabase**: Backend as a Service
- ✅ **Vercel**: Hospedagem e deploy
- 🔄 **SendGrid**: Envio de emails
- 🔄 **Firebase**: Notificações push
- 🔄 **Sentry**: Monitoramento de erros

---

## 🚀 **FUNCIONALIDADES EM DESENVOLVIMENTO**

### Curto Prazo
- 🔄 Sistema de pagamentos completo
- 🔄 Migração completa para Supabase Auth
- 🔄 Notificações por email
- 🔄 Recuperação de senha
- 🔄 Políticas de privacidade e termos

### Médio Prazo
- 🔄 App mobile (React Native)
- 🔄 Sistema de cupons e promoções
- 🔄 Programa de fidelidade
- 🔄 Chat com suporte ao cliente
- 🔄 Sistema de denúncias

### Longo Prazo
- 🔄 IA para recomendação de prestadores
- 🔄 Sistema de agendamento recorrente
- 🔄 Marketplace de produtos
- 🔄 Sistema de franquias
- 🔄 Expansão internacional

---

## 📈 **MÉTRICAS E KPIs**

### Métricas de Usuário
- Número total de usuários cadastrados
- Taxa de conversão de visitante para usuário
- Tempo médio na plataforma
- Taxa de retenção mensal

### Métricas de Negócio
- Número de agendamentos realizados
- Valor médio por transação
- Taxa de conclusão de serviços
- Receita mensal recorrente (MRR)

### Métricas de Qualidade
- Rating médio dos prestadores
- Taxa de cancelamento
- Tempo médio de resposta no chat
- NPS (Net Promoter Score)

---

## 🎯 **DIFERENCIAIS COMPETITIVOS**

1. **Interface Intuitiva**: Design limpo e fácil navegação
2. **Busca por CEP**: Encontre prestadores na sua região
3. **Chat Integrado**: Comunicação direta sem sair da plataforma
4. **Sistema de Avaliações**: Transparência e confiança
5. **Plano Premium**: Destaque para prestadores profissionais
6. **Notificações em Tempo Real**: Acompanhamento completo
7. **Responsividade**: Funciona perfeitamente no mobile
8. **Integração WhatsApp**: Comunicação familiar aos usuários

---

## 🔧 **TECNOLOGIAS UTILIZADAS**

### Frontend
- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utilitária
- **shadcn/ui**: Componentes de UI
- **Framer Motion**: Animações
- **React Hook Form**: Gerenciamento de formulários

### Backend
- **Supabase**: Backend as a Service
- **PostgreSQL**: Banco de dados relacional
- **Row Level Security**: Segurança a nível de linha
- **Supabase Auth**: Autenticação e autorização

### DevOps e Deploy
- **Vercel**: Hospedagem e CI/CD
- **GitHub**: Controle de versão
- **ESLint/Prettier**: Qualidade de código
- **TypeScript**: Verificação de tipos

### Monitoramento (Planejado)
- **Sentry**: Monitoramento de erros
- **Google Analytics**: Análise de uso
- **Vercel Analytics**: Métricas de performance

---

Esta documentação representa o estado atual da plataforma Maridão, incluindo funcionalidades implementadas (✅) e planejadas (🔄). A plataforma está em constante evolução, com novas funcionalidades sendo adicionadas regularmente baseadas no feedback dos usuários e necessidades do mercado.
