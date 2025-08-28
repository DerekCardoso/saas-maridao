"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToastContext } from "@/contexts/toast-context"
import { Calendar, Clock, Plus, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TimeSlot {
  start: string
  end: string
}

interface DayAvailability {
  enabled: boolean
  slots: TimeSlot[]
}

interface WeeklySchedule {
  [key: string]: DayAvailability
}

export function ProviderAvailabilityManager() {
  const toast = useToastContext()
  const [isLoading, setIsLoading] = useState(false)

  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule>({
    monday: {
      enabled: true,
      slots: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    tuesday: {
      enabled: true,
      slots: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    wednesday: {
      enabled: true,
      slots: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    thursday: {
      enabled: true,
      slots: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    friday: {
      enabled: true,
      slots: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],
    },
    saturday: {
      enabled: true,
      slots: [{ start: "08:00", end: "14:00" }],
    },
    sunday: {
      enabled: false,
      slots: [],
    },
  })

  const [blockedDates, setBlockedDates] = useState<string[]>([
    "2025-05-25", // Exemplo de data bloqueada
    "2025-06-01",
  ])

  const [newBlockedDate, setNewBlockedDate] = useState("")

  const dayNames = {
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo",
  }

  const toggleDayEnabled = (day: string) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }))
  }

  const addTimeSlot = (day: string) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: "09:00", end: "17:00" }],
      },
    }))
  }

  const removeTimeSlot = (day: string, index: number) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }))
  }

  const updateTimeSlot = (day: string, index: number, field: "start" | "end", value: string) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot)),
      },
    }))
  }

  const addBlockedDate = () => {
    if (newBlockedDate && !blockedDates.includes(newBlockedDate)) {
      setBlockedDates((prev) => [...prev, newBlockedDate])
      setNewBlockedDate("")
      toast.success({
        title: "Data bloqueada",
        description: "A data foi adicionada à lista de indisponibilidade.",
      })
    }
  }

  const removeBlockedDate = (date: string) => {
    setBlockedDates((prev) => prev.filter((d) => d !== date))
    toast.success({
      title: "Data desbloqueada",
      description: "A data foi removida da lista de indisponibilidade.",
    })
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success({
        title: "Disponibilidade atualizada",
        description: "Seus horários foram salvos com sucesso.",
      })
    } catch (error) {
      toast.error({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a disponibilidade.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="weekly" className="space-y-6">
      <TabsList>
        <TabsTrigger value="weekly">Horários Semanais</TabsTrigger>
        <TabsTrigger value="blocked">Datas Bloqueadas</TabsTrigger>
      </TabsList>

      <TabsContent value="weekly" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horários de Trabalho
            </CardTitle>
            <CardDescription>Configure seus horários de trabalho para cada dia da semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(weeklySchedule).map(([day, availability]) => (
              <div key={day} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch checked={availability.enabled} onCheckedChange={() => toggleDayEnabled(day)} />
                    <Label className="text-base font-medium">{dayNames[day as keyof typeof dayNames]}</Label>
                  </div>

                  {availability.enabled && (
                    <Button type="button" variant="outline" size="sm" onClick={() => addTimeSlot(day)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Horário
                    </Button>
                  )}
                </div>

                {availability.enabled && (
                  <div className="ml-8 space-y-2">
                    {availability.slots.map((slot, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateTimeSlot(day, index, "start", e.target.value)}
                          className="w-32"
                        />
                        <span className="text-muted-foreground">até</span>
                        <Input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateTimeSlot(day, index, "end", e.target.value)}
                          className="w-32"
                        />
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeTimeSlot(day, index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {availability.slots.length === 0 && (
                      <p className="text-sm text-muted-foreground">Nenhum horário configurado para este dia</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="blocked" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Datas Bloqueadas
            </CardTitle>
            <CardDescription>Bloqueie datas específicas em que você não estará disponível</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="date"
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
              <Button onClick={addBlockedDate} disabled={!newBlockedDate}>
                <Plus className="h-4 w-4 mr-1" />
                Bloquear Data
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Datas Bloqueadas:</Label>
              {blockedDates.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma data bloqueada</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {blockedDates.map((date) => (
                    <Badge key={date} variant="secondary" className="flex items-center gap-1">
                      {new Date(date + "T00:00:00").toLocaleDateString("pt-BR")}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeBlockedDate(date)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar Disponibilidade"}
        </Button>
      </div>
    </Tabs>
  )
}
