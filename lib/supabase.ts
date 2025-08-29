import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr"
import { createClient as createAdminClient } from "@supabase/supabase-js"

// IMPORTANT: Do not hardcode any keys here.
// Required envs:
// - NEXT_PUBLIC_SUPABASE_URL
// - NEXT_PUBLIC_SUPABASE_ANON_KEY
// - SUPABASE_SERVICE_ROLE_KEY (server only)

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function assertClientEnv() {
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
  if (!anonKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

function assertServerEnv() {
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY")
}

// Browser client (no cookies wiring needed)
export function createSupabaseBrowserClient() {
  assertClientEnv()
  return createBrowserClient(url!, anonKey!, {
    cookies: {
      // In the browser client, SSR helpers manage cookies automatically via document.cookie.
      get: (name: string) => {
        if (typeof document === "undefined") return undefined
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
        return match ? match[2] : undefined
      },
    },
  })
}

// Server client bound to Next.js cookies (RSC/Route Handlers)
// Pass a cookie adapter so Supabase Auth can persist/refresh session cookies.
export function createSupabaseServerClient() {
  assertClientEnv()
  // Lazy import to avoid client bundling next/headers
  const { cookies } = require("next/headers") as typeof import("next/headers")
  const cookieStore = cookies()

  return createServerClient(url!, anonKey!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // In Route Handlers, cookies.set is allowed.
          // In Server Components, set may be disallowed; swallow silently.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch {
          // See comment above.
        }
      },
    },
  })
}

// Admin client (server only). NEVER use in the browser.
export function getSupabaseAdmin() {
  if (typeof window !== "undefined") {
    throw new Error("getSupabaseAdmin() must not be used on the client")
  }
  assertServerEnv()
  return createAdminClient(url!, serviceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

// Legacy compatibility - create a default client for backward compatibility
export const supabase = typeof window === "undefined" ? createSupabaseServerClient() : createSupabaseBrowserClient()

// Also export as default for compatibility
export default supabase

// Admin client export for server-side use
export const supabaseAdmin = getSupabaseAdmin

// Types (kept for compatibility with the rest of the codebase)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          user_type: "client" | "provider" | "admin"
          is_admin: boolean
          password: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string | null
          user_type: "client" | "provider" | "admin"
          is_admin?: boolean
          password: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          user_type?: "client" | "provider" | "admin"
          is_admin?: boolean
          password?: string
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: { id: string; user_id: string; created_at: string; updated_at: string }
        Insert: { id?: string; user_id: string; created_at?: string; updated_at?: string }
        Update: { id?: string; user_id?: string; created_at?: string; updated_at?: string }
      }
      providers: {
        Row: {
          id: string
          user_id: string
          bio: string | null
          experience_years: number | null
          rating: number
          total_services: number
          is_premium: boolean
          is_available: boolean
          category_ids: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bio?: string | null
          experience_years?: number | null
          rating?: number
          total_services?: number
          is_premium?: boolean
          is_available?: boolean
          category_ids?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bio?: string | null
          experience_years?: number | null
          rating?: number
          total_services?: number
          is_premium?: boolean
          is_available?: boolean
          category_ids?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          street: string
          number: string | null
          complement: string | null
          neighborhood: string
          city: string
          state: string
          cep: string
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          street: string
          number?: string | null
          complement?: string | null
          neighborhood: string
          city: string
          state: string
          cep: string
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          street?: string
          number?: string | null
          complement?: string | null
          neighborhood?: string
          city?: string
          state?: string
          cep?: string
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      provider_specialties: {
        Row: { id: string; provider_id: string; name: string; created_at: string; updated_at: string }
        Insert: { id?: string; provider_id: string; name: string; created_at?: string; updated_at?: string }
        Update: { id?: string; provider_id?: string; name?: string; created_at?: string; updated_at?: string }
      }
      provider_availability: {
        Row: {
          id: string
          provider_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      provider_blocked_dates: {
        Row: {
          id: string
          provider_id: string
          blocked_date: string
          reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          blocked_date: string
          reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          blocked_date?: string
          reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          client_id: string
          provider_id: string
          service: string
          date: string
          time: string
          status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
          address: string
          details: string | null
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          provider_id: string
          service: string
          date: string
          time: string
          status?: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
          address: string
          details?: string | null
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          provider_id?: string
          service?: string
          date?: string
          time?: string
          status?: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
          address?: string
          details?: string | null
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          client_id: string
          provider_id: string
          appointment_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          provider_id: string
          appointment_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          provider_id?: string
          appointment_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: "appointment" | "message" | "review" | "payment" | "system"
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: "appointment" | "message" | "review" | "payment" | "system"
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: "appointment" | "message" | "review" | "payment" | "system"
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
