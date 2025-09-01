"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AdminSidebar } from "@/components/dashboard/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Dashboard do Administrador"
          subtitle="Gerencie usuários e configurações do sistema"
          userName="Admin Sistema"
          userEmail="admin@exemplo.com"
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
