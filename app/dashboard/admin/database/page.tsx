"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function DatabasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [seedResult, setSeedResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const runSeed = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/seed")
      const data = await response.json()

      if (response.ok) {
        setSeedResult(data)
      } else {
        setError(data.error || "Erro ao popular o banco de dados")
      }
    } catch (err) {
      setError("Erro ao conectar com a API")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento do Banco de Dados</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="seed">Popular Banco</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral do Banco de Dados</CardTitle>
              <CardDescription>Informações sobre as tabelas e registros no banco de dados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                O banco de dados do Maridão contém as seguintes tabelas:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Usuários e Perfis</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>User - Dados básicos dos usuários</li>
                    <li>Client - Perfis de clientes</li>
                    <li>Provider - Perfis de prestadores</li>
                    <li>Address - Endereços dos usuários</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Serviços e Especialidades</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>ProviderSpecialty - Especialidades dos prestadores</li>
                    <li>Service - Serviços oferecidos</li>
                    <li>Availability - Disponibilidade dos prestadores</li>
                    <li>Certification - Certificações dos prestadores</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Agendamentos e Avaliações</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Appointment - Agendamentos de serviços</li>
                    <li>Review - Avaliações dos serviços</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Comunicação e Pagamentos</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Message - Mensagens entre usuários</li>
                    <li>Subscription - Assinaturas premium</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seed">
          <Card>
            <CardHeader>
              <CardTitle>Popular Banco de Dados</CardTitle>
              <CardDescription>
                Crie dados de exemplo para testar a aplicação. Isso criará usuários, prestadores, agendamentos e
                avaliações.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              )}

              {seedResult && (
                <div className="bg-primary/10 text-primary p-4 rounded-md mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <p>{seedResult.message}</p>
                </div>
              )}

              {seedResult && seedResult.data && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm font-medium">Administradores</p>
                    <p className="text-2xl font-bold">{seedResult.data.admin}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm font-medium">Clientes</p>
                    <p className="text-2xl font-bold">{seedResult.data.clients}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm font-medium">Prestadores</p>
                    <p className="text-2xl font-bold">{seedResult.data.providers}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm font-medium">Agendamentos</p>
                    <p className="text-2xl font-bold">{seedResult.data.appointments}</p>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="font-medium mb-2">Credenciais de Acesso</h3>
                <div className="bg-muted p-4 rounded-md">
                  <div className="mb-4">
                    <p className="font-medium">Administrador:</p>
                    <p className="text-sm">Email: admin@maridao.com</p>
                    <p className="text-sm">Senha: admin123</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">Clientes:</p>
                    <p className="text-sm">Email: maria@example.com (ou outros)</p>
                    <p className="text-sm">Senha: cliente123</p>
                  </div>
                  <div>
                    <p className="font-medium">Prestadores:</p>
                    <p className="text-sm">Email: carlos@example.com (ou outros)</p>
                    <p className="text-sm">Senha: prestador123</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={runSeed} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Populando...
                  </>
                ) : (
                  "Popular Banco de Dados"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
