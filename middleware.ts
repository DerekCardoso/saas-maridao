import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Desabilitar completamente o middleware para permitir acesso direto
  return NextResponse.next()
}

export const config = {
  matcher: [], // Não interceptar nenhuma rota
}
