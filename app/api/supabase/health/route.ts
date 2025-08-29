import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from("users").select("count").limit(1)

    if (error) {
      console.error("Supabase health check failed:", error)
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    // Get basic stats
    const { count: usersCount } = await supabase.from("users").select("*", { count: "exact", head: true })

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      stats: {
        usersCount: usersCount || 0,
      },
      supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "missing",
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "configured" : "missing",
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing",
      },
    })
  } catch (error) {
    console.error("Supabase health check error:", error)
    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
