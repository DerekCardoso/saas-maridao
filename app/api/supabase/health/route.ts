import { NextResponse } from "next/server"
import { supabase, supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    // Test basic connection
    const { data: basicTest, error: basicError } = await supabase.from("users").select("count").limit(1)

    if (basicError) {
      console.error("❌ Basic connection failed:", basicError)
      return NextResponse.json(
        {
          ok: false,
          error: "Basic connection failed",
          details: basicError.message,
        },
        { status: 500 },
      )
    }

    // Test admin connection
    const { data: adminTest, error: adminError } = await supabaseAdmin.from("users").select("count").limit(1)

    if (adminError) {
      console.error("❌ Admin connection failed:", adminError)
      return NextResponse.json(
        {
          ok: false,
          error: "Admin connection failed",
          details: adminError.message,
        },
        { status: 500 },
      )
    }

    // Get user count
    const { count: userCount, error: countError } = await supabaseAdmin
      .from("users")
      .select("*", { count: "exact", head: true })

    return NextResponse.json({
      ok: true,
      message: "Supabase connection is healthy",
      userCount: userCount || 0,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("💥 Health check failed:", error)
    return NextResponse.json(
      {
        ok: false,
        error: "Health check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
