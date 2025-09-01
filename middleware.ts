import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Middleware completamente desabilitado - permitir acesso a todas as rotas
  return NextResponse.next()
}

export const config = {
  // Remover matcher para não interceptar nenhuma rota
  matcher: [],
}
