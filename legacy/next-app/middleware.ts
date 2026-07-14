import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const userType = request.cookies.get("userType")?.value
  const path = request.nextUrl.pathname

  // Rotas protegidas por tipo de usuário
  const clientRoutes = path.startsWith("/dashboard/client")
  const providerRoutes = path.startsWith("/dashboard/provider")
  const adminRoutes = path.startsWith("/dashboard/admin")

  // Verificar se o usuário está autenticado
  if ((clientRoutes || providerRoutes || adminRoutes) && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verificar se o usuário tem permissão para acessar a rota
  if (clientRoutes && userType && userType !== "client") {
    return NextResponse.redirect(new URL("/dashboard/" + userType, request.url))
  }

  if (providerRoutes && userType && userType !== "provider") {
    return NextResponse.redirect(new URL("/dashboard/" + userType, request.url))
  }

  if (adminRoutes && userType && userType !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/" + userType, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
