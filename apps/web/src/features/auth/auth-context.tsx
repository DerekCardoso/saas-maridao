import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"
import type { Role } from "@maridao/shared"
import { apiFetch } from "../../lib/api"
import { supabase } from "../../lib/supabase"

export type AppUser = {
  id: string
  email: string
  name?: string
  role: Role
  isBlocked: boolean
}

type SessionState = "loading" | "anonymous" | "authenticated"

interface AuthContextValue {
  session: Session | null
  user: AppUser | null
  sessionState: SessionState
  refreshProfile: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<AppUser | null>(null)
  const [sessionState, setSessionState] = useState<SessionState>("loading")

  const loadProfile = async (nextSession: Session | null) => {
    setSession(nextSession)
    if (!nextSession) {
      setUser(null)
      setSessionState("anonymous")
      return
    }

    try {
      const profile = await apiFetch<{
        id: string
        email: string
        name: string
        role: Role
        isBlocked: boolean
      }>("/me")
      setUser({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        isBlocked: profile.isBlocked
      })
    } catch {
      setUser(null)
    } finally {
      setSessionState("authenticated")
    }
  }

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => loadProfile(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void loadProfile(nextSession)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      sessionState,
      refreshProfile: async () => loadProfile(session),
      signOut: async () => {
        await supabase.auth.signOut()
      }
    }),
    [session, sessionState, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const value = useContext(AuthContext)
  if (!value) throw new Error("useAuth must be used inside AuthProvider")
  return value
}
