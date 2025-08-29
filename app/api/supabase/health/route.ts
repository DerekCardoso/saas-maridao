import { NextResponse } from "next/server"
import { supabase, supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    // Test regular client connection
    const { data: publicData, error: publicError } = await supabase.from("users").select("count").limit(1)

    // Test admin client connection
    const { data: adminData, error: adminError } = await supabaseAdmin.from("users").select("count(*)").single()

    const response = {
      ok: true,
      timestamp: new Date().toISOString(),
      supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "missing",
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "configured" : "missing",
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing",
      },
      tests: {
        publicClient: {
          success: !publicError,
          error: publicError?.message || null,
        },
        adminClient: {
          success: !adminError,
          error: adminError?.message || null,
          userCount: adminData?.count || 0,
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
