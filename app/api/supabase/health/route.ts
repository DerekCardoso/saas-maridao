import { NextResponse } from "next/server"
import { testSupabaseConnection } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("🏥 Health check iniciado...")

    // Test the connection
    const connectionResult = await testSupabaseConnection()

    if (!connectionResult.success) {
      console.error("❌ Health check falhou:", connectionResult.error)
      return NextResponse.json(
        {
          ok: false,
          error: "Supabase connection failed",
          details: connectionResult.error,
          timestamp: new Date().toISOString(),
          env: {
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "missing",
            anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "configured" : "missing",
            serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing",
          },
        },
        { status: 500 },
      )
    }

    console.log("✅ Health check passou!")

    return NextResponse.json({
      ok: true,
      message: "Supabase connection is healthy",
      timestamp: new Date().toISOString(),
      env: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "missing",
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "configured" : "missing",
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing",
      },
    })
  } catch (error) {
    console.error("💥 Health check exception:", error)
    return NextResponse.json(
      {
        ok: false,
        error: "Health check failed with exception",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
