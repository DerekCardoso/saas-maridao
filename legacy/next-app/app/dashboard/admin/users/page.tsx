import { Suspense } from "react"
import { AdminUsersHeader } from "@/components/dashboard/admin-users-header"
import { AdminUsersTable } from "@/components/dashboard/admin-users-table"
import { AdminUsersStats } from "@/components/dashboard/admin-users-stats"

export const metadata = {
  title: "Usuários | Admin",
  description: "Gerencie os usuários da plataforma",
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <AdminUsersHeader />

      <Suspense fallback={<div>Carregando estatísticas...</div>}>
        <AdminUsersStats />
      </Suspense>

      <Suspense fallback={<div>Carregando usuários...</div>}>
        <AdminUsersTable />
      </Suspense>
    </div>
  )
}
