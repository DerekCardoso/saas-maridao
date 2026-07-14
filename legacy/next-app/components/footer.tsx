import Link from "next/link"
import { Wrench } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Wrench className="h-6 w-6" />
              <span>Maridão</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Conectando você a profissionais qualificados para serviços domésticos.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Plataforma</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/como-funciona" className="text-muted-foreground hover:text-primary">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link href="/para-empresas" className="text-muted-foreground hover:text-primary">
                  Para empresas
                </Link>
              </li>
              <li>
                <Link href="/plano-premium" className="text-muted-foreground hover:text-primary">
                  Plano Premium
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  Perguntas frequentes
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/ajuda" className="text-muted-foreground hover:text-primary">
                  Central de ajuda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/termos" className="text-muted-foreground hover:text-primary">
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-muted-foreground hover:text-primary">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Maridão. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
