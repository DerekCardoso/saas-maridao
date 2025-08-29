import { NextResponse } from "next/server"
import { testSupabaseConnection } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("🏥 Verificando saúde do Supabase...")

    const result = await testSupabaseConnection()

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          timestamp: new Date().toISOString(),
          configStatus: result.configStatus,
          env: {
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "missing",
            anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "configured" : "missing",
            serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing",
          },
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection is healthy",
      timestamp: new Date().toISOString(),
      configStatus: result.configStatus,
      env: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "missing",
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "configured" : "missing",
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing",
      },
    })
  } catch (error) {
    console.error("💥 Exceção no health check:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
