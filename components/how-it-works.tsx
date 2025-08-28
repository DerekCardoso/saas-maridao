import { Search, Calendar, MessageSquare, Star } from "lucide-react"

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-muted py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Como funciona</h2>
          <p className="text-muted-foreground mt-2">Simples, rápido e sem complicações</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Busque</h3>
            <p className="text-sm text-muted-foreground">
              Encontre profissionais qualificados próximos a você para o serviço que precisa.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Agende</h3>
            <p className="text-sm text-muted-foreground">
              Escolha a data e horário que melhor se encaixa na sua agenda.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Converse</h3>
            <p className="text-sm text-muted-foreground">
              Negocie diretamente com o profissional via WhatsApp ou chat da plataforma.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Star className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Avalie</h3>
            <p className="text-sm text-muted-foreground">
              Após o serviço, avalie o profissional e ajude outros usuários.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
