"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToastContext } from "@/contexts/toast-context"
import { Play, ArrowLeft, Calendar, MapPin, User, CheckCircle } from "lucide-react"

interface ProviderStartServiceFormProps {
  appointmentId: string
}

export function ProviderStartServiceForm({ appointmentId }: ProviderStartServiceFormProps) {
  const router = useRouter()
  const toast = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [startNotes, setStartNotes] = useState("")
  const [estimatedDuration, setEstimatedDuration] = useState("")

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

  const handleStartService = async () => {
    setIsLoading(true)

    try {
      // Simular início do serviço
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success({
        title: "Serviço iniciado",
        description: "O serviço foi marcado como em andamento. O cliente foi notificado.",
      })

      // Simular notificação para o cliente
      setTimeout(() => {
        toast.info({
          title: "Cliente notificado",
          description: "O cliente foi informado sobre o início do atendimento.",
        })
      }, 1000)

      router.push("/dashboard/provider/appointments")
    } catch (error) {
      toast.error({
        title: "Erro ao iniciar",
        description: "Não foi possível iniciar o serviço. Tente novamente.",
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
            Informações do Serviço
          </CardTitle>
          <CardDescription>Confirme os detalhes antes de iniciar o atendimento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Serviço</Label>
            <p className="text-sm text-muted-foreground">{appointment.service}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Descrição</Label>
            <p className="text-sm text-muted-foreground">{appointment.description}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-blue-600" />
            Iniciar Atendimento
          </CardTitle>
          <CardDescription>Registre informações sobre o início do serviço</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duração Estimada (horas)</Label>
            <Input
              id="duration"
              type="number"
              step="0.5"
              min="0.5"
              max="12"
              placeholder="Ex: 2.5"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-notes">Observações Iniciais</Label>
            <Textarea
              id="start-notes"
              placeholder="Registre observações sobre o local, materiais encontrados, condições do trabalho, etc..."
              value={startNotes}
              onChange={(e) => setStartNotes(e.target.value)}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Lembrete Importante:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Tire fotos do local antes de iniciar</li>
              <li>• Confirme os materiais necessários com o cliente</li>
              <li>• Mantenha o cliente informado sobre o progresso</li>
              <li>• Registre qualquer alteração no escopo do trabalho</li>
            </ul>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={handleStartService} disabled={isLoading} className="flex-1">
              {isLoading ? "Iniciando..." : "Iniciar Serviço"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
