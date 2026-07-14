"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wrench, Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Wrench className="h-6 w-6" />
          <span>Maridão</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <button onClick={() => scrollToSection("como-funciona")} className="text-sm font-medium hover:text-primary">
            Como funciona?
          </button>
          <Link href="/plano-premium" className="text-sm font-medium hover:text-primary">
            Plano Premium
          </Link>
        </nav>

        <div className="hidden md:flex gap-4">
          <Button asChild variant="outline">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Cadastrar</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Menu</span>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white">
          <nav className="flex flex-col gap-4">
            <button
              className="text-sm font-medium p-2 hover:bg-muted rounded-md text-left"
              onClick={() => scrollToSection("como-funciona")}
            >
              Como funciona?
            </button>
            <Link
              href="/para-empresas"
              className="text-sm font-medium p-2 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Para empresas
            </Link>
            <Link
              href="/plano-premium"
              className="text-sm font-medium p-2 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Plano Premium
            </Link>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Entrar
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  Cadastrar
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
