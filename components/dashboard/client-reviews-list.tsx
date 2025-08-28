"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ClientReviewCard } from "@/components/dashboard/client-review-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ClientReviewsList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Dados mockados para avaliações
  const reviews = {
    completed: [
      {
        id: "1",
        providerName: "João Silva",
        providerId: "1",
        service: "Elétrica",
        date: "10 de Maio, 2025",
        rating: 5,
        comment: "Excelente profissional, muito pontual e trabalho de qualidade.",
      },
      {
        id: "2",
        providerName: "Carlos Mendes",
        providerId: "2",
        service: "Montagem de Móveis",
        date: "28 de Abril, 2025",
        rating: 4,
        comment: "Bom trabalho, apenas um pequeno atraso na chegada.",
      },
      {
        id: "3",
        providerName: "Roberto Almeida",
        providerId: "3",
        service: "Hidráulica",
        date: "15 de Abril, 2025",
        rating: 5,
        comment: "Resolveu o problema rapidamente e com eficiência.",
      },
    ],
    pending: [
      {
        id: "4",
        providerName: "Pedro Santos",
        providerId: "4",
        service: "Reparos Gerais",
        date: "5 de Maio, 2025",
        appointmentId: "app-123",
      },
      {
        id: "5",
        providerName: "Marcos Oliveira",
        providerId: "5",
        service: "Instalações",
        date: "2 de Maio, 2025",
        appointmentId: "app-456",
      },
    ],
  }

  // Filtrar avaliações com base na busca
  const filteredCompleted = reviews.completed.filter(
    (review) =>
      review.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPending = reviews.pending.filter(
    (review) =>
      review.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.service.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por profissional ou serviço..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="completed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="completed">Avaliações Enviadas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
        </TabsList>

        <TabsContent value="completed" className="space-y-4">
          {filteredCompleted.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma avaliação encontrada.</p>
            </div>
          ) : (
            filteredCompleted.map((review) => (
              <ClientReviewCard
                key={review.id}
                id={review.id}
                providerName={review.providerName}
                providerId={review.providerId}
                service={review.service}
                date={review.date}
                rating={review.rating}
                comment={review.comment}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filteredPending.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma avaliação pendente encontrada.</p>
            </div>
          ) : (
            filteredPending.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{review.providerName}</h3>
                    <p className="text-sm text-muted-foreground">{review.service}</p>
                    <p className="text-sm text-muted-foreground">Data: {review.date}</p>
                  </div>
                  <Button asChild>
                    <Link href={`/dashboard/client/appointments/${review.appointmentId}/review`}>Avaliar Serviço</Link>
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
