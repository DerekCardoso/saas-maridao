import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, TrendingUp, Calendar, MessageSquare, Star, Award, BarChart } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export const metadata: Metadata = {
  title: "Plano Premium | Maridão",
  description: "Conheça os benefícios do plano premium para prestadores de serviços na plataforma Maridão",
}

export default function PlanoPremiumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge
                variant="outline"
                className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 px-4 py-1"
              >
                Plano Premium
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Destaque-se e aumente seus ganhos com o Maridão Premium
              </h1>
              <p className="text-primary-foreground/80 md:text-xl max-w-[800px]">
                Tenha acesso a recursos exclusivos, maior visibilidade e mais oportunidades para expandir seus negócios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" variant="secondary">
                  Assinar Agora
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Benefícios Exclusivos</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                O plano premium foi desenvolvido para ajudar prestadores de serviços a crescerem e se destacarem na
                plataforma.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <CardTitle>Maior Visibilidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Apareça no topo dos resultados de busca e seja destacado com o selo Premium, aumentando suas chances
                    de ser contratado.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <CardTitle>Agenda Avançada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gerencie sua disponibilidade com ferramentas avançadas de agendamento, sincronização com calendário
                    e lembretes automáticos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <CardTitle>Comunicação Prioritária</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Receba notificações prioritárias sobre novos pedidos de serviço e tenha acesso a recursos avançados
                    de comunicação.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Star className="h-6 w-6" />
                  </div>
                  <CardTitle>Perfil Destacado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Personalize seu perfil com mais fotos, vídeos de trabalhos anteriores e destaque suas melhores
                    avaliações.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6" />
                  </div>
                  <CardTitle>Análises Detalhadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Acesse estatísticas detalhadas sobre seu desempenho, visualizações de perfil e conversão de
                    clientes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <CardTitle>Selo de Verificação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ganhe um selo de verificação que aumenta a confiança dos clientes e demonstra seu compromisso com a
                    qualidade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparação de Planos */}
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Compare os Planos</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Veja a diferença entre o plano gratuito e o plano premium e escolha a melhor opção para o seu negócio.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Plano Gratuito
                    <Badge variant="outline">Básico</Badge>
                  </CardTitle>
                  <CardDescription>Para quem está começando</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">R$ 0</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Perfil básico na plataforma</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Recebimento de solicitações de serviço</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Gerenciamento básico de agenda</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Comunicação com clientes</span>
                    </div>
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                      <span className="text-muted-foreground">Destaque nos resultados de busca</span>
                    </div>
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                      <span className="text-muted-foreground">Selo Premium</span>
                    </div>
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                      <span className="text-muted-foreground">Ferramentas avançadas de agenda</span>
                    </div>
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                      <span className="text-muted-foreground">Estatísticas detalhadas</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Plano Atual
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Recomendado
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Plano Premium
                    <Badge className="bg-primary">Premium</Badge>
                  </CardTitle>
                  <CardDescription>Para profissionais que querem crescer</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">R$ 49,90</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Tudo do plano gratuito</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        <strong>Destaque nos resultados de busca</strong>
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        <strong>Selo Premium e verificação</strong>
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Ferramentas avançadas de agenda</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Estatísticas e análises detalhadas</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Perfil destacado com mais recursos</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Notificações prioritárias</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Suporte prioritário</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Assinar Agora</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                * Assinatura mensal, cancele a qualquer momento. Oferecemos 7 dias de garantia de satisfação.
              </p>
            </div>
          </div>
        </section>

        {/* Planos de Assinatura */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Escolha seu Plano</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Temos opções flexíveis para atender às suas necessidades.
              </p>
            </div>

            <Tabs defaultValue="monthly" className="w-full max-w-md mx-auto mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
                <TabsTrigger value="annual">Anual (2 meses grátis)</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="mt-4 text-center">
                <div className="text-3xl font-bold">
                  R$ 49,90<span className="text-lg font-normal">/mês</span>
                </div>
                <p className="text-muted-foreground mt-1">Cobrado mensalmente</p>
              </TabsContent>
              <TabsContent value="annual" className="mt-4 text-center">
                <div className="text-3xl font-bold">
                  R$ 39,90<span className="text-lg font-normal">/mês</span>
                </div>
                <p className="text-muted-foreground mt-1">R$ 478,80 cobrado anualmente</p>
                <Badge variant="secondary" className="mt-2">
                  Economize 20%
                </Badge>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center mt-8">
              <Button size="lg" className="px-8">
                Começar Agora
              </Button>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">O que dizem nossos assinantes Premium</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Veja como o plano Premium ajudou outros profissionais a expandirem seus negócios.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarFallback>RM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Roberto Mendes</h3>
                      <p className="text-sm text-muted-foreground">Eletricista • São Paulo</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Desde que assinei o plano Premium, minha agenda está sempre cheia. O destaque nos resultados de
                    busca fez toda a diferença, e os clientes confiam mais por causa do selo de verificação."
                  </p>
                  <div className="flex mt-4">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarFallback>CA</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Carlos Almeida</h3>
                      <p className="text-sm text-muted-foreground">Montador de Móveis • Rio de Janeiro</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "As ferramentas de agenda avançadas me ajudam a organizar melhor meu tempo. Consigo atender mais
                    clientes e as estatísticas me mostram onde posso melhorar. Minha renda aumentou 40% em três meses!"
                  </p>
                  <div className="flex mt-4">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarFallback>FS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Fernanda Silva</h3>
                      <p className="text-sm text-muted-foreground">Encanadora • Belo Horizonte</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Como mulher em um setor predominantemente masculino, o selo Premium me ajudou a ganhar mais
                    credibilidade. As notificações prioritárias me permitem responder rapidamente e fechar mais
                    negócios."
                  </p>
                  <div className="flex mt-4">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+65%</div>
                <p className="text-muted-foreground">Aumento médio de solicitações de serviço</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+40%</div>
                <p className="text-muted-foreground">Aumento médio de faturamento mensal</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">92%</div>
                <p className="text-muted-foreground">Taxa de renovação da assinatura</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Perguntas Frequentes</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Tire suas dúvidas sobre o plano Premium.</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Como funciona o destaque nos resultados de busca?</AccordionTrigger>
                  <AccordionContent>
                    Os prestadores Premium aparecem no topo dos resultados de busca, antes dos prestadores do plano
                    gratuito. Além disso, seus perfis são destacados com o selo Premium, aumentando a visibilidade e a
                    confiança dos clientes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Posso cancelar a assinatura a qualquer momento?</AccordionTrigger>
                  <AccordionContent>
                    Sim, você pode cancelar sua assinatura a qualquer momento. Se cancelar antes do final do período
                    pago, você continuará tendo acesso aos recursos Premium até o final desse período.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Quanto tempo leva para ver resultados?</AccordionTrigger>
                  <AccordionContent>
                    A maioria dos prestadores começa a ver um aumento nas solicitações de serviço nas primeiras semanas.
                    No entanto, os resultados podem variar dependendo de fatores como sua localização, especialidade e
                    avaliações anteriores.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>O que são as ferramentas avançadas de agenda?</AccordionTrigger>
                  <AccordionContent>
                    As ferramentas avançadas de agenda incluem sincronização com Google Calendar e outros calendários
                    populares, bloqueio automático de horários já agendados, lembretes automáticos para você e seus
                    clientes, e a possibilidade de definir intervalos entre serviços.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Como funciona o selo de verificação?</AccordionTrigger>
                  <AccordionContent>
                    O selo de verificação é concedido após uma verificação adicional de seus documentos e credenciais
                    profissionais. Isso aumenta a confiança dos clientes e demonstra seu compromisso com a qualidade e a
                    segurança.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Existe um período de teste?</AccordionTrigger>
                  <AccordionContent>
                    Oferecemos uma garantia de satisfação de 7 dias. Se você não estiver satisfeito com o plano Premium,
                    pode solicitar o cancelamento e reembolso dentro desse período.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para impulsionar seu negócio?</h2>
              <p className="text-primary-foreground/80 mb-8">
                Junte-se a milhares de profissionais que já estão aproveitando os benefícios do plano Premium.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Assinar Premium
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
                  Falar com um Consultor
                </Button>
              </div>
              <p className="mt-6 text-sm text-primary-foreground/60">
                Sem compromisso de permanência. Cancele quando quiser.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
