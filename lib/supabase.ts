import { createClient } from "@supabase/supabase-js"

// Environment variables - these should be set in your Vercel deployment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseAnonKey) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

if (!supabaseServiceKey) {
  throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY")
}

// Main Supabase client for general use
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (never use in browser)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
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

// Test connection function
export async function testSupabaseConnection() {
  try {
    console.log("🔍 Testing Supabase connection...")
    console.log("URL:", supabaseUrl)
    console.log("Anon Key:", supabaseAnonKey ? "Present" : "Missing")
    console.log("Service Key:", supabaseServiceKey ? "Present" : "Missing")

    const { data, error } = await supabaseAdmin.from("users").select("count").limit(1)

    if (error) {
      console.error("❌ Supabase connection failed:", error)
      return { success: false, error: error.message }
    }

    console.log("✅ Supabase connection successful")
    return { success: true, data }
  } catch (error) {
    console.error("💥 Supabase connection error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
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
