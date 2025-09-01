"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProviderSidebar } from "@/components/dashboard/provider-sidebar"

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <ProviderSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Dashboard do Prestador"
          subtitle="Gerencie seus serviços e clientes"
          userName="Carlos Oliveira"
          userEmail="carlos@exemplo.com"
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
