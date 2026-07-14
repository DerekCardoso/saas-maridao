"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Edit, Trash2, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
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

export function AdminUsersTable() {
  const toast = useToastContext()
  const [searchQuery, setSearchQuery] = useState("")

  // Dados mockados para usuários
  const users = [
    {
      id: "1",
      name: "João Silva",
      email: "joao.silva@email.com",
      type: "client",
      status: "active",
      registeredDate: "10 de Maio, 2025",
    },
    {
      id: "2",
      name: "Ana Paula",
      email: "ana.paula@email.com",
      type: "client",
      status: "active",
      registeredDate: "12 de Maio, 2025",
    },
    {
      id: "3",
      name: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      type: "provider",
      status: "pending",
      registeredDate: "14 de Maio, 2025",
    },
    {
      id: "4",
      name: "Roberto Almeida",
      email: "roberto.almeida@email.com",
      type: "provider",
      status: "active",
      registeredDate: "5 de Maio, 2025",
    },
    {
      id: "5",
      name: "Juliana Costa",
      email: "juliana.costa@email.com",
      type: "client",
      status: "inactive",
      registeredDate: "28 de Abril, 2025",
    },
    {
      id: "6",
      name: "Marcos Oliveira",
      email: "marcos.oliveira@email.com",
      type: "provider",
      status: "active",
      registeredDate: "20 de Abril, 2025",
    },
    {
      id: "7",
      name: "Fernanda Lima",
      email: "fernanda.lima@email.com",
      type: "client",
      status: "active",
      registeredDate: "15 de Abril, 2025",
    },
  ]

  // Filtrar usuários com base na busca
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEditUser = (userId: string) => {
    toast.info({
      title: "Editar usuário",
      description: `Editando usuário com ID: ${userId}`,
    })
  }

  const handleDeleteUser = (userId: string) => {
    toast.success({
      title: "Usuário excluído",
      description: `Usuário com ID: ${userId} foi excluído com sucesso.`,
    })
  }

  const handleActivateUser = (userId: string) => {
    toast.success({
      title: "Usuário ativado",
      description: `Usuário com ID: ${userId} foi ativado com sucesso.`,
    })
  }

  const handleDeactivateUser = (userId: string) => {
    toast.warning({
      title: "Usuário desativado",
      description: `Usuário com ID: ${userId} foi desativado com sucesso.`,
    })
  }

  // Função para renderizar o status do usuário
  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>
      case "inactive":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Inativo
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Pendente
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  // Função para renderizar o tipo de usuário
  const renderType = (type: string) => {
    switch (type) {
      case "client":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Cliente
          </Badge>
        )
      case "provider":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            Prestador
          </Badge>
        )
      case "admin":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Admin
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
            placeholder="Buscar usuários..."
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
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Registro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{renderType(user.type)}</TableCell>
                  <TableCell>{renderStatus(user.status)}</TableCell>
                  <TableCell>{user.registeredDate}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        {user.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleDeactivateUser(user.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Desativar
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Ativar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
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
