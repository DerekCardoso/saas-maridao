import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, TrendingUp, Calendar, BarChart } from "lucide-react"
import Link from "next/link"

export default function ProviderPremiumPage() {
  // Simulação de status premium
  const isPremium = false

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Plano Premium</h1>
        <p className="text-muted-foreground">Destaque-se e aumente seus ganhos com recursos exclusivos.</p>
      </div>

      <Card className={isPremium ? "border-primary" : ""}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Seu Plano</CardTitle>
              {isPremium ? (
                <Badge className="bg-yellow-400 text-yellow-900">Premium</Badge>
              ) : (
                <Badge variant="outline">Gratuito</Badge>
              )}
            </div>
            {isPremium && (
              <Badge variant="outline" className="text-green-500 border-green-500">
                Ativo
              </Badge>
            )}
          </div>
          <CardDescription>
            {isPremium
              ? "Você está aproveitando todos os benefícios do plano Premium"
              : "Atualize para o plano Premium e destaque-se na plataforma"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isPremium ? (
              <div className="space-y-2">
                <p className="text-sm">Sua assinatura Premium está ativa</p>
                <p className="text-sm text-muted-foreground">Próxima cobrança: 15/06/2025</p>
                <p className="text-sm text-muted-foreground">Valor: R$ 49,90</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-center">Maior Visibilidade</h3>
                  <p className="text-sm text-center text-muted-foreground mt-1">
                    Apareça no topo dos resultados de busca
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Star className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-center">Selo Premium</h3>
                  <p className="text-sm text-center text-muted-foreground mt-1">
                    Destaque-se com o selo de prestador premium
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-center">Agenda Avançada</h3>
                  <p className="text-sm text-center text-muted-foreground mt-1">Ferramentas avançadas de agendamento</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isPremium ? (
            <div className="flex gap-4">
              <Button variant="outline">Gerenciar Assinatura</Button>
              <Button variant="destructive">Cancelar Plano</Button>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">Plano Premium</p>
                  <p className="text-sm text-muted-foreground">Destaque-se na plataforma</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ 49,90/mês</p>
                  <p className="text-sm text-muted-foreground">Cancele quando quiser</p>
                </div>
              </div>
              <Button className="w-full">Assinar Plano Premium</Button>
            </div>
          )}
        </CardFooter>
      </Card>

      {!isPremium && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Benefícios do Plano Premium</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Destaque nos resultados de busca</h3>
                <p className="text-sm text-muted-foreground">
                  Apareça no topo dos resultados de busca, aumentando suas chances de ser contratado.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Selo Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Ganhe um selo premium que aumenta a confiança dos clientes e destaca seu perfil.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Ferramentas avançadas de agenda</h3>
                <p className="text-sm text-muted-foreground">
                  Gerencie sua disponibilidade com ferramentas avançadas de agendamento e sincronização com calendário.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Estatísticas detalhadas</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse estatísticas detalhadas sobre seu desempenho, visualizações de perfil e conversão de clientes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button asChild size="lg">
              <Link href="/plano-premium">Ver todos os benefícios</Link>
            </Button>
          </div>
        </div>
      )}

      {isPremium && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Estatísticas Premium
            </CardTitle>
            <CardDescription>Acompanhe o desempenho do seu perfil com estatísticas exclusivas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Visualizações do perfil</p>
                <p className="text-2xl font-bold">248</p>
                <p className="text-xs text-green-500">↑ 12% em relação ao mês anterior</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Taxa de conversão</p>
                <p className="text-2xl font-bold">18.5%</p>
                <p className="text-xs text-green-500">↑ 3.2% em relação ao mês anterior</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Posição média nos resultados</p>
                <p className="text-2xl font-bold">#3</p>
                <p className="text-xs text-green-500">↑ 2 posições em relação ao mês anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
