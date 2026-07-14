"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ReviewForm } from "@/components/review/review-form"
import { useEffect, useState } from "react"

// Simulação de dados de agendamento
const getAppointmentData = (id: string) => ({
  id,
  providerId: "1",
  providerName: "João Silva",
  service: "Instalação de Tomadas",
  date: "15 de Maio, 2025",
  time: "14:00 - 16:00",
  status: "completed",
})

export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const [appointment, setAppointment] = useState<any>(null)

  useEffect(() => {
    // Em uma implementação real, você buscaria os dados do agendamento do servidor
    setAppointment(getAppointmentData(params.id as string))
  }, [params.id])

  const handleReviewSubmitted = () => {
    // Redireciona de volta para a página de agendamentos após enviar a avaliação
    setTimeout(() => {
      router.push("/dashboard/client/appointments")
    }, 1500)
  }

  if (!appointment) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Avaliar Serviço</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <ReviewForm
            appointmentId={appointment.id}
            providerId={appointment.providerId}
            providerName={appointment.providerName}
            service={appointment.service}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </CardContent>
      </Card>
    </div>
  )
}
