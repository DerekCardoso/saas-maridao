"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientServiceHistoryItem } from "./client-service-history-item"

interface Appointment {
  id: string
  providerName: string
  providerId: string
  date: string
  service: string
  status: string
  hasReview: boolean
}

export function ClientServiceHistory() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Buscar agendamentos
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments")
        if (response.ok) {
          const data = await response.json()
          setAppointments(data)
          setFilteredAppointments(data)
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  // Filtrar agendamentos
  useEffect(() => {
    let filtered = [...appointments]

    // Filtrar por status
    if (statusFilter !== "all") {
      filtered = filtered.filter((appointment) => appointment.status === statusFilter)
    }

    // Filtrar por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (appointment) =>
          appointment.providerName.toLowerCase().includes(query) || appointment.service.toLowerCase().includes(query),
      )
    }

    setFilteredAppointments(filtered)
  }, [statusFilter, searchQuery, appointments])

  if (isLoading) {
    return <div>Carregando histórico de serviços...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por prestador ou serviço..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os serviços</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="confirmed">Confirmados</SelectItem>
            <SelectItem value="completed">Concluídos</SelectItem>
            <SelectItem value="cancelled">Cancelados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAppointments.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <h3 className="mt-2 text-lg font-semibold">Nenhum serviço encontrado</h3>
          <p className="text-muted-foreground">Não encontramos serviços que correspondam aos seus filtros.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <ClientServiceHistoryItem key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  )
}
