import { createClient } from "@supabase/supabase-js"

// Environment variables - these should be set in your Vercel deployment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lrgzntxgdivnimaxaqvp.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZ3pudHhnZGl2bmltYXhhcXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDY5NTEsImV4cCI6MjA2MzkyMjk1MX0.5CxSx82wSMChWm5kL16xWytcbuX5v97qDgq_WvmO_AM"
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZ3pudHhnZGl2bmltYXhhcXZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODM0Njk1MSwiZXhwIjoyMDYzOTIyOTUxfQ.mSJLxMf_SzT16aO6-EO4JgxxoCSLgqgpBqEr-WHAEWE"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Main Supabase client for general use
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (never use in browser)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Export default for compatibility
export default supabase

// Browser client function
export function createSupabaseBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Server client function (for when we migrate to Supabase Auth)
export function createSupabaseServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Admin client function
export function getSupabaseAdmin() {
  return supabaseAdmin
}

// Database types
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
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
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
        Row: {
          id: string
          provider_id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
