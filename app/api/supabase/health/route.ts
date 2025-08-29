import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("🏥 Verificando saúde do Supabase...")

    // Test database connection
    const { data, error } = await supabaseAdmin.from("users").select("count").limit(1)

    if (error) {
      console.error("❌ Erro na conexão com Supabase:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    console.log("✅ Supabase está funcionando")
    return NextResponse.json({
      success: true,
      message: "Supabase connection is healthy",
      data,
      timestamp: new Date().toISOString(),
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
