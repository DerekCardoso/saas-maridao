import { Bell, BriefcaseBusiness, CalendarDays, LogOut, Search, Shield, UserRound } from "lucide-react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../features/auth/auth-context"
import { cn } from "../lib/cn"
import { Button } from "../components/ui/button"

const roleLinks = {
  client: [
    { to: "/client/appointments", label: "Agendamentos", icon: CalendarDays },
    { to: "/client/reviews", label: "Avaliações", icon: UserRound }
  ],
  provider: [
    { to: "/provider/appointments", label: "Agenda", icon: CalendarDays },
    { to: "/provider/availability", label: "Horários", icon: CalendarDays },
    { to: "/provider/profile", label: "Perfil", icon: BriefcaseBusiness },
    { to: "/provider/premium", label: "Premium", icon: Shield }
  ],
  admin: [{ to: "/admin", label: "Administração", icon: Shield }],
  super_admin: [{ to: "/admin", label: "Administração", icon: Shield }]
}

export function AppShell() {
  const { user, sessionState, signOut } = useAuth()
  const links = user ? roleLinks[user.role] : []

  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6">
          <Link to="/" className="text-xl font-black text-brand-700">
            Maridão
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"
                )
              }
            >
              <Search className="size-4" />
              Buscar
            </NavLink>
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                    isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"
                  )
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {sessionState === "authenticated" ? (
              <>
                <Link
                  to="/notifications"
                  aria-label="Notificações"
                  className="grid size-10 place-items-center rounded-md text-slate-600 hover:bg-slate-100"
                >
                  <Bell className="size-5" />
                </Link>
                <Button variant="ghost" onClick={() => void signOut()} title="Sair">
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 text-sm font-semibold text-brand-700">
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Criar conta
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
