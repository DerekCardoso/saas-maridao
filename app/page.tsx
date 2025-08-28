import { Button } from "@/components/ui/button"
import { PenToolIcon as Tool, Wrench, Hammer, Zap, Droplet, Sofa } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import { StatsSection } from "@/components/stats-section"
import { HowItWorks } from "@/components/how-it-works"
import { RecentActivity } from "@/components/recent-activity"
import { CepSearch } from "@/components/cep-search"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Precisando contratar <span className="text-primary">serviços domésticos</span> de forma rápida, simples
                e objetiva?
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[800px]">
                Precisando de um "marido de aluguel"? Contrate e negocie diretamente com profissionais qualificados, sem
                taxas de intermediação!
              </p>
              <p className="text-lg font-medium">
                Pague diretamente para o profissional, sem taxa de intermediação - o profissional ganha muito mais!
              </p>

              <div className="w-full max-w-md mx-auto mt-8">
                <CepSearch />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Services Section */}
        <section className="bg-white py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Serviços Disponíveis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ServiceCard
                icon={<Tool className="h-8 w-8" />}
                title="Reparos Gerais"
                description="Pequenos consertos e reparos em sua casa"
              />
              <ServiceCard
                icon={<Zap className="h-8 w-8" />}
                title="Elétrica"
                description="Instalações e reparos elétricos"
              />
              <ServiceCard
                icon={<Droplet className="h-8 w-8" />}
                title="Hidráulica"
                description="Reparos e instalações hidráulicas"
              />
              <ServiceCard
                icon={<Sofa className="h-8 w-8" />}
                title="Montagem de Móveis"
                description="Montagem e desmontagem de móveis"
              />
              <ServiceCard
                icon={<Wrench className="h-8 w-8" />}
                title="Manutenção"
                description="Manutenção preventiva e corretiva"
              />
              <ServiceCard
                icon={<Hammer className="h-8 w-8" />}
                title="Instalações"
                description="Instalação de equipamentos e acessórios"
              />
            </div>
          </div>
        </section>

        {/* How it Works */}
        <HowItWorks />

        {/* Recent Activity */}
        <RecentActivity />

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-12 md:py-24">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de clientes satisfeitos e profissionais qualificados em nossa plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/register?type=client">Sou Cliente</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
                <Link href="/register?type=provider">Sou Prestador</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
