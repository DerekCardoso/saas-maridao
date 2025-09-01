import type React from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ClientSidebar } from "@/components/dashboard/client-sidebar"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <ClientSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Dashboard do Cliente"
          subtitle="Gerencie seus agendamentos e serviços"
          userType="client"
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
