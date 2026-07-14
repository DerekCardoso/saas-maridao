"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Star, Wrench, Zap, Droplet, Shield, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProviderReviewCard } from "@/components/provider-review-card"
import { ScheduleServiceForm } from "@/components/schedule-service-form"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ChatButton } from "@/components/chat/chat-button"
import { useToast } from "@/components/ui/use-toast"

// Simulação de dados do prestador
const getProviderData = (id: string) => ({
  id,
  name: "João Silva",
  avatar: "",
  isPremium: true,
  rating: 4.8,
  reviewsCount: 124,
  completedJobs: 156,
  memberSince: "Janeiro de 2024",
  responseTime: "Em média 30 minutos",
  location: "São Paulo, SP",
  phone: "11999887766",
  about:
    "Profissional com mais de 10 anos de experiência em serviços elétricos residenciais e comerciais. Especializado em instalações, reparos e manutenção preventiva. Formado em Técnico em Eletrotécnica pelo SENAI e com certificações em instalações elétricas de baixa tensão.",
  services: [
    { id: "1", name: "Instalação de Tomadas", price: "R$ 80,00", duration: "1 hora" },
    { id: "2", name: "Troca de Disjuntores", price: "R$ 100,00", duration: "1 hora" },
    { id: "3", name: "Instalação de Luminárias", price: "R$ 120,00", duration: "2 horas" },
    { id: "4", name: "Reparo em Curto-Circuito", price: "A partir de R$ 150,00", duration: "2-3 horas" },
    { id: "5", name: "Instalação de Ventilador de Teto", price: "R$ 180,00", duration: "2 horas" },
  ],
  availability: [
    { day: "Segunda-feira", hours: "08:00 - 18:00" },
    { day: "Terça-feira", hours: "08:00 - 18:00" },
    { day: "Quarta-feira", hours: "08:00 - 18:00" },
    { day: "Quinta-feira", hours: "08:00 - 18:00" },
    { day: "Sexta-feira", hours: "08:00 - 18:00" },
    { day: "Sábado", hours: "08:00 - 12:00" },
  ],
  certifications: [
    "Técnico em Eletrotécnica - SENAI",
    "NR-10 - Segurança em Instalações Elétricas",
    "Instalações Elétricas Residenciais - SENAI",
  ],
  specialties: ["Elétrica", "Instalações", "Reparos"],
  reviews: [
    {
      id: "1",
      author: "Maria Santos",
      rating: 5,
      date: "15 de abril, 2025",
      comment:
        "Excelente profissional! Resolveu o problema elétrico da minha casa rapidamente e com preço justo. Recomendo!",
      service: "Reparo em Curto-Circuito",
    },
    {
      id: "2",
      author: "Carlos Oliveira",
      rating: 4,
      date: "2 de abril, 2025",
      comment:
        "Muito bom no serviço, instalou todas as tomadas corretamente. Apenas atrasou um pouco no horário combinado.",
      service: "Instalação de Tomadas",
    },
    {
      id: "3",
      author: "Ana Pereira",
      rating: 5,
      date: "28 de março, 2025",
      comment:
        "Profissional pontual e muito educado. Fez a instalação das luminárias com perfeição. Já agendei outro serviço!",
      service: "Instalação de Luminárias",
    },
  ],
})

export default function ProviderDetailsPage({ params }: { params: { id: string } }) {
  const [providerData, setProviderData] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulação de verificação de login
    const checkLoginStatus = () => {
      // Em uma implementação real, você verificaria o estado de autenticação
      // Por exemplo, verificando um token no localStorage ou usando uma biblioteca de autenticação
      const hasSession = localStorage.getItem("userSession")
      setIsLoggedIn(!!hasSession)
    }

    // Carrega os dados do prestador
    setProviderData(getProviderData(params.id))
    checkLoginStatus()

    // Para fins de demonstração, vamos simular que o usuário pode estar ou não logado
    // Em um ambiente real, você usaria um sistema de autenticação adequado
    const simulateAuth = () => {
      // Simulação: 50% de chance de estar logado para demonstração
      if (Math.random() > 0.5) {
        localStorage.setItem("userSession", "demo-session")
        setIsLoggedIn(true)
      } else {
        localStorage.removeItem("userSession")
        setIsLoggedIn(false)
      }
    }

    // Remova esta linha em produção - apenas para demonstração
    simulateAuth()
  }, [params.id])

  const handleServiceClick = (serviceId: string, serviceName: string) => {
    // Rolar até o formulário de agendamento
    const scheduleForm = document.getElementById("schedule-form")
    if (scheduleForm) {
      scheduleForm.scrollIntoView({ behavior: "smooth" })

      // Mostrar toast informativo
      toast({
        title: "Serviço selecionado",
        description: `Você selecionou o serviço: ${serviceName}`,
      })
    }
  }

  if (!providerData) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          {/* Cabeçalho do Perfil */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarFallback className="text-2xl">
                    {providerData.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {providerData.isPremium && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1">
                    <Shield className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl md:text-3xl font-bold">{providerData.name}</h1>
                      {providerData.isPremium && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center mt-2 gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-medium">{providerData.rating}</span>
                      <span className="text-muted-foreground">({providerData.reviewsCount} avaliações)</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{providerData.completedJobs} serviços realizados</span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {providerData.specialties.map((specialty: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 md:mt-0">
                    <ChatButton providerId={params.id} providerName={providerData.name} isLoggedIn={isLoggedIn} />
                    <WhatsAppButton phoneNumber={providerData.phone}>Falar pelo WhatsApp</WhatsAppButton>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{providerData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Responde em {providerData.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Membro desde {providerData.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="about">Sobre</TabsTrigger>
                  <TabsTrigger value="services">Serviços</TabsTrigger>
                  <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                  <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Sobre {providerData.name}</h2>
                    <p className="text-muted-foreground">{providerData.about}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Certificações e Qualificações</h3>
                    <ul className="space-y-2">
                      {providerData.certifications.map((cert: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="services" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Serviços Oferecidos</h2>
                  <div className="space-y-4">
                    {providerData.services.map((service: any) => (
                      <Card key={service.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{service.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{service.price}</p>
                            <Button
                              size="sm"
                              className="mt-2"
                              onClick={() => handleServiceClick(service.id, service.name)}
                            >
                              Agendar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Avaliações</h2>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-medium text-lg">{providerData.rating}</span>
                      <span className="text-muted-foreground">({providerData.reviewsCount} avaliações)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {providerData.reviews.map((review: any) => (
                      <ProviderReviewCard
                        key={review.id}
                        author={review.author}
                        rating={review.rating}
                        date={review.date}
                        comment={review.comment}
                        service={review.service}
                      />
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline">Ver Todas as Avaliações</Button>
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Disponibilidade</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {providerData.availability.map((slot: any, index: number) => (
                      <div key={index} className="flex justify-between p-3 border rounded-md">
                        <span className="font-medium">{slot.day}</span>
                        <span className="text-muted-foreground">{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    * A disponibilidade pode variar. Confirme o horário ao agendar o serviço.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Coluna Lateral */}
            <div className="space-y-6">
              <Card id="schedule-form">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Agendar Serviço</h2>
                  <ScheduleServiceForm
                    providerId={params.id}
                    providerName={providerData.name}
                    isLoggedIn={isLoggedIn}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Especialidades</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Zap className="h-4 w-4 text-primary" />
                      <span>Elétrica</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Wrench className="h-4 w-4 text-primary" />
                      <span>Instalações</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Droplet className="h-4 w-4 text-primary" />
                      <span>Reparos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Área de Atendimento</h3>
                  <p className="text-sm text-muted-foreground mb-2">Este profissional atende nas seguintes regiões:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>São Paulo - Zona Sul, Zona Oeste</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Grande São Paulo - Até 30km</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
