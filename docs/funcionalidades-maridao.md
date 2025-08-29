# Funcionalidades da Plataforma Maridão

## Visão Geral

A **Plataforma Maridão** é um marketplace digital que conecta clientes a prestadores de serviços domésticos e residenciais. A plataforma oferece uma experiência completa de agendamento, comunicação, pagamento e avaliação de serviços.

## Perfis de Usuário

### 1. Cliente
Pessoa física que busca contratar serviços domésticos.

### 2. Prestador de Serviços
Profissional autônomo que oferece serviços domésticos na plataforma.

### 3. Administrador
Gestor da plataforma com acesso a todas as funcionalidades administrativas.

---

## Funcionalidades por Perfil

## 🏠 **CLIENTE**

### Autenticação e Perfil
- **Cadastro completo** com dados pessoais e endereço
- **Login seguro** com validação de credenciais
- **Gerenciamento de perfil** (editar dados, foto, preferências)
- **Múltiplos endereços** (residencial, comercial, etc.)
- **Busca por CEP** com preenchimento automático via ViaCEP

### Busca e Contratação
- **Busca de prestadores** por categoria de serviço
- **Filtros avançados** (avaliação, preço, localização, disponibilidade)
- **Visualização de perfis** completos dos prestadores
- **Agendamento de serviços** com data, horário e detalhes
- **Solicitação de orçamento** personalizado

### Comunicação
- **Chat interno** com prestadores
- **Histórico de conversas** organizadas por prestador
- **Notificações em tempo real** de mensagens
- **Suporte ao cliente** via chat

### Gestão de Serviços
- **Painel de agendamentos** (pendentes, confirmados, em andamento, concluídos)
- **Histórico completo** de serviços contratados
- **Acompanhamento de status** em tempo real
- **Cancelamento** de agendamentos (com políticas)
- **Reagendamento** quando permitido

### Avaliações e Feedback
- **Sistema de avaliação** (1-5 estrelas + comentário)
- **Histórico de avaliações** dadas
- **Visualização de avaliações** de outros clientes

### Notificações
- **Central de notificações** organizada por tipo
- **Alertas de agendamento** (lembretes, confirmações)
- **Notificações de mensagens** não lidas
- **Updates de status** dos serviços

---

## 🔧 **PRESTADOR DE SERVIÇOS**

### Perfil Profissional
- **Cadastro completo** com dados profissionais
- **Portfolio de serviços** com descrições e preços
- **Especialidades múltiplas** (elétrica, hidráulica, montagem, etc.)
- **Área de cobertura** por CEP/região
- **Certificações e experiência** (anos de atuação)

### Gestão de Disponibilidade
- **Calendário de disponibilidade** por dia da semana
- **Horários de funcionamento** personalizáveis
- **Bloqueio de datas** (férias, feriados, compromissos)
- **Gestão de agenda** em tempo real

### Gestão de Solicitações
- **Recebimento de solicitações** de serviço
- **Aceitar/Rejeitar** agendamentos
- **Propor reagendamento** quando necessário
- **Definir preços** por tipo de serviço

### Plano Premium
- **Visibilidade aumentada** nos resultados de busca
- **Badge premium** no perfil
- **Prioridade** nas listagens
- **Estatísticas avançadas** de performance
- **Suporte prioritário**

### Comunicação
- **Chat com clientes** interessados
- **Histórico de conversas** organizadas
- **Notificações** de novas mensagens
- **Suporte técnico** especializado

### Relatórios e Estatísticas
- **Dashboard de performance** (serviços, avaliações, receita)
- **Histórico de serviços** prestados
- **Estatísticas de avaliação** e feedback
- **Relatórios financeiros** básicos

---

## ⚙️ **ADMINISTRADOR**

### Gestão de Usuários
- **Painel de usuários** (clientes e prestadores)
- **Moderação de perfis** e conteúdo
- **Suspensão/Ativação** de contas
- **Suporte direto** aos usuários

### Gestão de Serviços
- **Monitoramento de agendamentos** em tempo real
- **Resolução de conflitos** entre partes
- **Gestão de cancelamentos** e reembolsos
- **Auditoria de transações**

### Relatórios e Analytics
- **Dashboard executivo** com KPIs principais
- **Relatórios de uso** da plataforma
- **Análise de performance** por região/categoria
- **Métricas de satisfação** dos usuários

### Configurações da Plataforma
- **Gestão de categorias** de serviço
- **Configuração de preços** e comissões
- **Políticas de uso** e termos
- **Configurações de notificação** globais

---

## 🌐 **FUNCIONALIDADES GERAIS**

### Páginas Públicas
- **Landing page** com apresentação da plataforma
- **Busca pública** de prestadores (sem login)
- **Páginas de categoria** de serviços
- **Como funciona** (tutorial da plataforma)
- **Plano Premium** (informações e contratação)

### Sistema de Busca
- **Busca por CEP** com raio de atendimento
- **Filtros múltiplos** (preço, avaliação, disponibilidade)
- **Ordenação** (relevância, preço, avaliação, premium)
- **Resultados paginados** com carregamento otimizado

### Integração ViaCEP
- **Busca automática** de endereço por CEP
- **Validação** de CEPs brasileiros
- **Preenchimento automático** de formulários
- **Tratamento de erros** para CEPs inválidos

### Sistema de Notificações
- **Notificações em tempo real** via WebSocket
- **Persistência** no banco de dados
- **Categorização** por tipo (agendamento, mensagem, sistema)
- **Marcação** de lidas/não lidas
- **Limpeza automática** de notificações antigas

### Chat em Tempo Real
- **Mensagens instantâneas** entre usuários
- **Histórico persistente** de conversas
- **Indicadores** de mensagem lida/não lida
- **Suporte a emojis** e texto formatado

### Sistema de Avaliações
- **Avaliação bidirecional** (cliente avalia prestador)
- **Escala de 1-5 estrelas** + comentário opcional
- **Cálculo automático** de média de avaliações
- **Moderação** de comentários inadequados

---

## 🔧 **ARQUITETURA TÉCNICA**

### Frontend
- **Next.js 14** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **Shadcn/UI** para componentes
- **Framer Motion** para animações
- **React Hook Form** para formulários

### Backend
- **Supabase** como BaaS (Backend as a Service)
- **PostgreSQL** como banco de dados
- **Row Level Security (RLS)** para segurança
- **Real-time subscriptions** para chat e notificações

### Integrações
- **ViaCEP API** para busca de endereços
- **WhatsApp Business** para suporte
- **Sistema de pagamentos** (a implementar)

### Autenticação
- **Sistema customizado** com JWT
- **Middleware** para proteção de rotas
- **Sessões persistentes** com cookies seguros
- **Diferentes níveis** de acesso por perfil

---

## 📱 **EXPERIÊNCIA DO USUÁRIO**

### Design Responsivo
- **Mobile-first** approach
- **Adaptação automática** para tablet e desktop
- **Touch-friendly** interfaces
- **Performance otimizada** para dispositivos móveis

### Acessibilidade
- **ARIA labels** em componentes interativos
- **Navegação por teclado** completa
- **Contraste adequado** de cores
- **Textos alternativos** em imagens

### Performance
- **Carregamento lazy** de componentes
- **Otimização de imagens** automática
- **Cache inteligente** de dados
- **Skeleton loading** para melhor UX

---

## 🔒 **SEGURANÇA E PRIVACIDADE**

### Proteção de Dados
- **Criptografia** de senhas com bcrypt
- **Validação** rigorosa de inputs
- **Sanitização** de dados do usuário
- **LGPD compliance** (em desenvolvimento)

### Segurança de API
- **Rate limiting** para prevenir abuso
- **Validação** de tokens JWT
- **CORS** configurado adequadamente
- **Logs de auditoria** para ações críticas

---

## 🚀 **FUNCIONALIDADES FUTURAS**

### Em Desenvolvimento
- **Sistema de pagamentos** integrado
- **Geolocalização** avançada
- **Push notifications** mobile
- **API pública** para integrações

### Roadmap
- **App mobile nativo** (iOS/Android)
- **Sistema de fidelidade** para clientes
- **Marketplace de produtos** relacionados
- **Inteligência artificial** para matching

---

## 📊 **MÉTRICAS E KPIs**

### Métricas de Negócio
- **Número de usuários** ativos (clientes/prestadores)
- **Agendamentos** realizados por período
- **Taxa de conversão** de visitantes para usuários
- **Receita** gerada por comissões
- **Satisfação** média dos usuários

### Métricas Técnicas
- **Tempo de resposta** das APIs
- **Uptime** da plataforma
- **Taxa de erro** nas transações
- **Performance** de carregamento das páginas

---

Esta documentação representa o estado atual da plataforma Maridão, incluindo todas as funcionalidades implementadas e planejadas. A plataforma está em constante evolução para melhor atender às necessidades de clientes e prestadores de serviços.
\`\`\`

Agora vou testar se o erro foi resolvido verificando os imports no arquivo de login:

```typescriptreact file="components/auth/login-form.tsx"
[v0-no-op-code-block-prefix]"use client"

import type React from "react"
import { createClientComponentClient } from "@supabase/supabase-js"
import { useState } from "react"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

const supabase = createClientComponentClient()
const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória"
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      const user = data.user

      if (user) {
        localStorage.setItem("maridao_user", JSON.stringify(user))

        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a) de volta, ${user.email}!`,
        })

        // Assuming userType is stored in the user metadata
        const userType = user.user_metadata.userType || "client"

        switch (userType) {
          case "admin":
            router.push("/admin")
            break
          case "provider":
            router.push("/provider")
            break
          case "client":
            router.push("/client")
            break
          default:
            router.push("/")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Email ou senha incorretos. Tente novamente.",
        })
      }
    } catch (error) {
      console.error("Erro no login:", error)
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Entre com suas credenciais para acessar sua conta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="link" className="px-0" asChild>
          <a href="/forgot-password">Esqueceu a senha?</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
