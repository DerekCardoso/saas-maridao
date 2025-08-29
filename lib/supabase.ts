import { createClient } from "@supabase/supabase-js"

// Environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

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

// Helper functions with better error handling
export function getSupabaseClient() {
  if (!supabase) {
    const missingVars = []
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missingVars.push("NEXT_PUBLIC_SUPABASE_ANON_KEY")

    throw new Error(`Supabase client not initialized. Missing environment variables: ${missingVars.join(", ")}`)
  }
  return supabase
}

export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    const missingVars = []
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missingVars.push("SUPABASE_SERVICE_ROLE_KEY")

    throw new Error(`Supabase admin client not initialized. Missing environment variables: ${missingVars.join(", ")}`)
  }
  return supabaseAdmin
}

// Check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey && supabaseServiceKey)
}

// Get configuration status
export function getSupabaseConfigStatus() {
  return {
    url: !!supabaseUrl,
    anonKey: !!supabaseAnonKey,
    serviceKey: !!supabaseServiceKey,
    isFullyConfigured: isSupabaseConfigured(),
    missingVars: [
      !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
      !supabaseAnonKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      !supabaseServiceKey && "SUPABASE_SERVICE_ROLE_KEY",
    ].filter(Boolean),
  }
}

// Test connection function with better error handling
export async function testSupabaseConnection() {
  try {
    console.log("🔍 Testing Supabase connection...")

    const configStatus = getSupabaseConfigStatus()
    console.log("Config status:", configStatus)

    if (!configStatus.isFullyConfigured) {
      return {
        success: false,
        error: `Missing environment variables: ${configStatus.missingVars.join(", ")}. Please configure them in your deployment settings.`,
        configStatus,
      }
    }

    if (!supabaseAdmin) {
      return {
        success: false,
        error: "Supabase admin client not initialized despite having environment variables.",
        configStatus,
      }
    }

    const { data, error } = await supabaseAdmin.from("users").select("count").limit(1)

    if (error) {
      console.error("❌ Supabase connection failed:", error)
      return { success: false, error: error.message, configStatus }
    }

    console.log("✅ Supabase connection successful")
    return { success: true, data, configStatus }
  } catch (error) {
    console.error("💥 Supabase connection error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      configStatus: getSupabaseConfigStatus(),
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
