import type React from "react"
import type { Metadata } from "next"
import { ProviderSidebar } from "@/components/dashboard/provider-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: "Dashboard do Prestador | Maridão",
  description: "Gerencie seus serviços e agendamentos",
}

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader userType="provider" />

      <div className="flex flex-1">
        <div className="hidden md:block">
          <ProviderSidebar />
        </div>
        <main className="flex-1 p-4 md:p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  )
}
