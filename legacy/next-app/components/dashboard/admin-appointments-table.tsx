"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Edit, Trash2, MoreHorizontal, CheckCircle, XCircle, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToastContext } from "@/contexts/toast-context"

export function AdminAppointmentsTable() {
  const toast = useToastContext()
  const [searchQuery, setSearchQuery] = useState("")

  // Dados mockados para agendamentos
  const appointments = [
    {
      id: "1",
      clientName: "Ana Paula",
      providerName: "João Silva",
      service: "Elétrica",
      date: "15 de Maio, 2025",
      time: "14:00 - 16:00",
      status: "confirmed",
    },
    {
      id: "2",
      clientName: "Marcos Silva",
      providerName: "Carlos Mendes",
      service: "Montagem de Móveis",
      date: "18 de Maio, 2025",
      time: "09:00 - 12:00",
      status: "confirmed",
    },
    {
      id: "3",
      clientName: "Juliana Costa",
      providerName: "Roberto Almeida",
      service: "Elétrica",
      date: "22 de Maio, 2025",
      time: "10:00 - 12:00",
      status: "pending",
    },
    {
      id: "4",
      clientName: "Ricardo Mendes",
      providerName: "Pedro Santos",
      service: "Reparos Gerais",
      date: "5 de Maio, 2025",
      time: "13:00 - 15:00",
      status: "completed",
    },
    {
      id: "5",
      clientName: "Fernanda Lima",
      providerName: "Marcos Oliveira",
      service: "Instalações",
      date: "28 de Abril, 2025",
      time: "10:00 - 12:00",
      status: "completed",
    },
    {
      id: "6",
      clientName: "Lucas Ferreira",
      providerName: "Roberto Almeida",
      service: "Pintura",
      date: "15 de Abril, 2025",
      time: "09:00 - 17:00",
      status: "cancelled",
    },
  ]

  // Filtrar agendamentos com base na busca
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewAppointment = (appointmentId: string) => {
    toast.info({
      title: "Ver agendamento",
      description: `Visualizando agendamento com ID: ${appointmentId}`,
    })
  }

  const handleEditAppointment = (appointmentId: string) => {
    toast.info({
      title: "Editar agendamento",
      description: `Editando agendamento com ID: ${appointmentId}`,
    })
  }

  const handleDeleteAppointment = (appointmentId: string) => {
    toast.success({
      title: "Agendamento excluído",
      description: `Agendamento com ID: ${appointmentId} foi excluído com sucesso.`,
    })
  }

  const handleCompleteAppointment = (appointmentId: string) => {
    toast.success({
      title: "Agendamento concluído",
      description: `Agendamento com ID: ${appointmentId} foi marcado como concluído.`,
    })
  }

  const handleCancelAppointment = (appointmentId: string) => {
    toast.warning({
      title: "Agendamento cancelado",
      description: `Agendamento com ID: ${appointmentId} foi cancelado.`,
    })
  }

  // Função para renderizar o status do agendamento
  const renderStatus = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-blue-500">Confirmado</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Pendente
          </Badge>
        )
      case "completed":
        return <Badge className="bg-green-500">Concluído</Badge>
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Cancelado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar agendamentos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filtrar</Button>
        <Button variant="outline">Exportar</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Prestador</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Nenhum agendamento encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.clientName}</TableCell>
                  <TableCell>{appointment.providerName}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{renderStatus(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewAppointment(appointment.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditAppointment(appointment.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        {appointment.status !== "completed" && appointment.status !== "cancelled" && (
                          <DropdownMenuItem onClick={() => handleCompleteAppointment(appointment.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Marcar como Concluído
                          </DropdownMenuItem>
                        )}
                        {appointment.status !== "cancelled" && (
                          <DropdownMenuItem onClick={() => handleCancelAppointment(appointment.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancelar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
