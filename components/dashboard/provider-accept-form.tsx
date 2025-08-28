"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToastContext } from "@/contexts/toast-context"
import { CheckCircle, ArrowLeft, Calendar, MapPin, User, DollarSign } from "lucide-react"

interface ProviderAcceptFormProps {
  appointmentId: string
}

export function ProviderAcceptForm({ appointmentId }: ProviderAcceptFormProps) {
  const router = useRouter()
  const toast = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState("")

  // Dados mockados do agendamento
  const [appointment] = useState({
    id: appointmentId,
    clientName: "Ana Paula",
    clientPhone: "(11) 99999-1111",
    service: "Elétrica",
    date: "2025-05-15",
    time: "14:00 - 16:00",
    address: "Rua das Flores, 123 - Jardim Primavera",
    price: "R$ 150,00",
    description: "Instalação de tomadas e troca de disjuntores",
  })

  const handleAccept = async () => {
    setIsLoading(true)

    try {
      // Simular aceitação
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success({
        title: "Agendamento aceito",
        description: "O cliente foi notificado sobre a confirmação do serviço.",
      })

      // Simular notificação para o cliente
      setTimeout(() => {
        toast.info({
          title: "Cliente notificado",
          description: "O cliente recebeu a confirmação por WhatsApp e email.",
        })
      }, 1000)

      router.push("/dashboard/provider/appointments")
    } catch (error) {
      toast.error({
        title: "Erro ao aceitar",
        description: "Não foi possível aceitar o agendamento. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Detalhes do Agendamento
          </CardTitle>
          <CardDescription>Revise as informações antes de aceitar o serviço</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium">Cliente</Label>
                <p className="text-sm text-muted-foreground">{appointment.clientName}</p>
                <p className="text-sm text-muted-foreground">{appointment.clientPhone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium">Data e Horário</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(appointment.date).toLocaleDateString("pt-BR")} - {appointment.time}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <Label className="text-sm font-medium">Endereço</Label>
                <p className="text-sm text-muted-foreground">{appointment.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium">Valor do Serviço</Label>
                <p className="text-sm font-medium text-green-600">{appointment.price}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Serviço Solicitado</Label>
            <p className="text-sm text-muted-foreground">{appointment.service}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Descrição</Label>
            <p className="text-sm text-muted-foreground">{appointment.description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações (Opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações sobre o serviço, materiais necessários, etc..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Voltar
            </Button>
            <Button onClick={handleAccept} disabled={isLoading} className="flex-1">
              {isLoading ? "Aceitando..." : "Aceitar Agendamento"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
