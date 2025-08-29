"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Key, TestTube, Users } from "lucide-react"
import Link from "next/link"

export function ClientTestGuide() {
  const steps = [
    {
      id: 1,
      title: "Executar Schema SQL",
      description: "Execute o arquivo supabase/schema.sql no Supabase SQL Editor",
      icon: <Database className="h-5 w-5" />,
      status: "pending",
    },
    {
      id: 2,
      title: "Criar Usuários de Teste",
      description: "Execute o arquivo supabase/test-users.sql para criar contas de teste",
      icon: <Users className="h-5 w-5" />,
      status: "pending",
    },
    {
      id: 3,
      title: "Configurar Variáveis de Ambiente",
      description: "Configure NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY",
      icon: <Key className="h-5 w-5" />,
      status: "pending",
    },
    {
      id: 4,
      title: "Testar Cadastro",
      description: "Use o componente de teste para verificar se o cadastro está funcionando",
      icon: <TestTube className="h-5 w-5" />,
      status: "ready",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-6 w-6" />
            Guia de Teste - Cadastro e Login
          </CardTitle>
          <CardDescription>
            Siga os passos abaixo para configurar e testar o sistema de cadastro e login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">{step.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">
                      {step.id}. {step.title}
                    </h3>
                    <Badge variant={step.status === "ready" ? "default" : "secondary"}>
                      {step.status === "ready" ? "Pronto" : "Pendente"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/register/test-registration">Testar Cadastro</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login/test-login">Testar Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/api/supabase/health" target="_blank">
                Health Check
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Arquivos SQL Necessários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">1. supabase/schema.sql</h4>
              <p className="text-sm text-muted-foreground">
                Cria todas as tabelas, índices, triggers e constraints necessários
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">2. supabase/test-users.sql</h4>
              <p className="text-sm text-muted-foreground">
                Insere usuários de teste: admin@maridao.com, cliente@teste.com, prestador@teste.com (senha: 123456)
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">3. supabase/policies.sql</h4>
              <p className="text-sm text-muted-foreground">
                Configura as políticas de segurança RLS para proteger os dados
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
