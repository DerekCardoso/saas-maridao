"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToastContext } from "@/contexts/toast-context"
import { XCircle, ArrowLeft, Calendar, MapPin, User } from "lucide-react"

interface ProviderRejectFormProps {
  appointmentId: string
}

export function ProviderRejectForm({ appointmentId }: ProviderRejectFormProps) {
  const router = useRouter()
  const toast = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")

  // Dados mockados do agendamento
  const [appointment] = useState({
    id: appointmentId,
    clientName: "Ana Paula",
    service: "Elétrica",
    date: "2025-05-15",
    time: "14:00 - 16:00",
    address: "Rua das Flores, 123 - Jardim Primavera",
    price: "R$ 150,00",
  })

  const rejectReasons = [
    { value: "agenda-cheia", label: "Agenda lotada no período solicitado" },
    { value: "fora-area", label: "Localização fora da minha área de atendimento" },
    { value: "tipo-servico", label: "Não realizo este tipo de serviço" },
    { value: "valor", label: "Valor não condiz com o serviço solicitado" },
    { value: "indisponivel", label: "Estarei indisponível na data" },
    { value: "outro", label: "Outro motivo" },
  ]

  const handleReject = async () => {
    if (!reason) {
      toast.error({
        title: "Motivo obrigatório",
        description: "Por favor, selecione um motivo para a recusa.",
      })
      return
    }

    if (reason === "outro" && !customReason.trim()) {
      toast.error({
        title: "Descrição obrigatória",
        description: "Por favor, descreva o motivo da recusa.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simular recusa
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success({
        title: "Agendamento recusado",
        description: "O cliente foi notificado sobre a recusa do serviço.",
      })

      // Simular sugestão de outros prestadores
      setTimeout(() => {
        toast.info({
          title: "Sugestões enviadas",
          description: "O cliente recebeu sugestões de outros prestadores disponíveis.",
        })
      }, 1000)

      router.push("/dashboard/provider/appointments")
    } catch (error) {
      toast.error({
        title: "Erro ao recusar",
        description: "Não foi possível recusar o agendamento. Tente novamente.",
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
            <XCircle className="h-5 w-5 text-red-600" />
            Detalhes do Agendamento
          </CardTitle>
          <CardDescription>Agendamento que será recusado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium">Cliente</Label>
                <p className="text-sm text-muted-foreground">{appointment.clientName}</p>
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Motivo da Recusa</CardTitle>
          <CardDescription>Selecione o motivo para ajudar o cliente a entender a recusa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={reason} onValueChange={setReason}>
            {rejectReasons.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {reason === "outro" && (
            <div className="space-y-2">
              <Label htmlFor="custom-reason">Descreva o motivo</Label>
              <Textarea
                id="custom-reason"
                placeholder="Explique o motivo da recusa..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={handleReject} disabled={isLoading} variant="destructive" className="flex-1">
              {isLoading ? "Recusando..." : "Confirmar Recusa"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
