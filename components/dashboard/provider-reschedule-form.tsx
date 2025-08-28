"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToastContext } from "@/contexts/toast-context"
import { Calendar, ArrowLeft } from "lucide-react"

interface ProviderRescheduleFormProps {
  appointmentId: string
}

export function ProviderRescheduleForm({ appointmentId }: ProviderRescheduleFormProps) {
  const router = useRouter()
  const toast = useToastContext()
  const [isLoading, setIsLoading] = useState(false)

  // Dados mockados do agendamento atual
  const [appointment] = useState({
    id: appointmentId,
    clientName: "Ana Paula",
    service: "Elétrica",
    currentDate: "2025-05-15",
    currentTime: "14:00",
    address: "Rua das Flores, 123 - Jardim Primavera",
    price: "R$ 150,00",
  })

  const [formData, setFormData] = useState({
    date: appointment.currentDate,
    time: appointment.currentTime,
    reason: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simular reagendamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success({
        title: "Agendamento reagendado",
        description: `O serviço foi reagendado para ${new Date(formData.date).toLocaleDateString("pt-BR")} às ${formData.time}`,
      })

      // Notificar cliente (simulado)
      setTimeout(() => {
        toast.info({
          title: "Cliente notificado",
          description: "O cliente foi informado sobre a alteração de horário.",
        })
      }, 1000)

      router.push("/dashboard/provider/appointments")
    } catch (error) {
      toast.error({
        title: "Erro ao reagendar",
        description: "Não foi possível reagendar o serviço. Tente novamente.",
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
          <CardTitle>Informações do Agendamento</CardTitle>
          <CardDescription>Detalhes do serviço a ser reagendado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Cliente</Label>
              <p className="text-sm text-muted-foreground">{appointment.clientName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Serviço</Label>
              <p className="text-sm text-muted-foreground">{appointment.service}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Data Atual</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(appointment.currentDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Horário Atual</Label>
              <p className="text-sm text-muted-foreground">{appointment.currentTime}</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Endereço</Label>
            <p className="text-sm text-muted-foreground">{appointment.address}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Valor</Label>
            <p className="text-sm text-muted-foreground font-medium text-green-600">{appointment.price}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Novo Agendamento
          </CardTitle>
          <CardDescription>Selecione a nova data e horário para o serviço</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Nova Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Novo Horário</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo do Reagendamento</Label>
              <Textarea
                id="reason"
                placeholder="Explique o motivo do reagendamento para o cliente..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Reagendando..." : "Confirmar Reagendamento"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
