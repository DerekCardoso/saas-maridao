import { createClient } from "@supabase/supabase-js"

// Environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Validate required environment variables
if (!supabaseUrl) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

if (!supabaseServiceKey) {
  console.error("❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable")
}

// Create clients only if we have the required variables
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null

// Export default for compatibility
export default supabase

// Helper functions
export function getSupabaseClient() {
  if (!supabase) {
    throw new Error("Supabase client not initialized. Check environment variables.")
  }
  return supabase
}

export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error("Supabase admin client not initialized. Check environment variables.")
  }
  return supabaseAdmin
}

// Test connection function
export async function testSupabaseConnection() {
  try {
    console.log("🔍 Testing Supabase connection...")
    console.log("URL:", supabaseUrl || "MISSING")
    console.log("Anon Key:", supabaseAnonKey ? "Present" : "MISSING")
    console.log("Service Key:", supabaseServiceKey ? "Present" : "MISSING")

    if (!supabaseAdmin) {
      return {
        success: false,
        error: "Supabase admin client not initialized. Check environment variables.",
      }
    }

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
