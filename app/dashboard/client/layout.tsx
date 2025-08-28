import type React from "react"
import type { Metadata } from "next"
import { ClientSidebar } from "@/components/dashboard/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: "Dashboard do Cliente | Maridão",
  description: "Gerencie seus agendamentos e encontre profissionais",
}

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader userType="client" />

      <div className="flex flex-1">
        <div className="hidden md:block">
          <ClientSidebar />
        </div>
        <main className="flex-1 p-4 md:p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  )
}
