import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    // Test admin connection
    const supabaseAdmin = getSupabaseAdmin()

    // Simple query to test connectivity
    const { data, error, count } = await supabaseAdmin.from("users").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Supabase health check error:", error)
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      ok: true,
      usersCount: count,
      timestamp: new Date().toISOString(),
      environment: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    })
  } catch (error) {
    console.error("Supabase health check failed:", error)
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
