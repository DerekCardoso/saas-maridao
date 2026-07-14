import type { ReactNode } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { AppShell } from "./app-shell"
import { ProtectedRoute } from "./protected-route"
import { useAuth } from "../features/auth/auth-context"
import { SearchPage } from "../features/search/search-page"
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from "../features/auth/auth-page"
import { ProviderPage } from "../features/providers/provider-page"
import { ProviderProfilePage } from "../features/providers/provider-profile-page"
import { AppointmentsPage } from "../features/appointments/appointments-page"
import { AvailabilityPage } from "../features/appointments/availability-page"
import { ReviewsPage } from "../features/reviews/reviews-page"
import { PremiumPage } from "../features/billing/premium-page"
import { NotificationsPage } from "../features/notifications/notifications-page"
import { AdminPage } from "../features/admin/admin-page"

function Guard({ roles, children }: { roles: Array<"client" | "provider" | "admin" | "super_admin">; children: ReactNode }) {
  const { user, sessionState } = useAuth()
  return <ProtectedRoute sessionState={sessionState} user={user} allowedRoles={roles}>{children}</ProtectedRoute>
}

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <SearchPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
      { path: "/auth/confirm", element: <Navigate to="/" replace /> },
      { path: "/providers/:id", element: <ProviderPage /> },
      { path: "/client", element: <Navigate to="/client/appointments" replace /> },
      { path: "/client/appointments", element: <Guard roles={["client"]}><AppointmentsPage /></Guard> },
      { path: "/client/reviews", element: <Guard roles={["client"]}><ReviewsPage /></Guard> },
      { path: "/provider", element: <Navigate to="/provider/appointments" replace /> },
      { path: "/provider/profile", element: <Guard roles={["provider"]}><ProviderProfilePage /></Guard> },
      { path: "/provider/appointments", element: <Guard roles={["provider"]}><AppointmentsPage /></Guard> },
      { path: "/provider/availability", element: <Guard roles={["provider"]}><AvailabilityPage /></Guard> },
      { path: "/provider/premium", element: <Guard roles={["provider"]}><PremiumPage /></Guard> },
      { path: "/notifications", element: <Guard roles={["client", "provider", "admin", "super_admin"]}><NotificationsPage /></Guard> },
      { path: "/admin", element: <Guard roles={["admin", "super_admin"]}><AdminPage /></Guard> },
      { path: "*", element: <main className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-3xl font-black">Página não encontrada</h1></main> }
    ]
  }
])
