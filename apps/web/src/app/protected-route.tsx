import type { ReactNode } from "react"
import type { Role } from "@maridao/shared"
import { Navigate } from "react-router-dom"
import type { AppUser } from "../features/auth/auth-context"
import { LoadingState } from "../components/ui/state"

export function ProtectedRoute({
  children,
  sessionState,
  user,
  allowedRoles
}: {
  children: ReactNode
  sessionState: "loading" | "anonymous" | "authenticated"
  user: AppUser | null
  allowedRoles?: Role[]
}) {
  if (sessionState === "loading") return <LoadingState />
  if (sessionState === "anonymous") return <Navigate to="/login" replace />
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Acesso não autorizado</h1>
        <p className="mt-2 text-slate-600">Sua conta não possui permissão para esta área.</p>
      </main>
    )
  }
  return children
}
