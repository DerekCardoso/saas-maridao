export function StatsSection() {
  return (
    <section className="bg-muted py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold">25K+</p>
            <p className="text-xs md:text-sm text-muted-foreground">serviços realizados</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold">8K+</p>
            <p className="text-xs md:text-sm text-muted-foreground">agendamentos</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold">250</p>
            <p className="text-xs md:text-sm text-muted-foreground">cidades com profissionais</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold">950</p>
            <p className="text-xs md:text-sm text-muted-foreground">cidades pesquisadas</p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>último endereço pesquisado: 04532-001 - Itaim Bibi</p>
          <p>15 profissionais encontrados</p>
        </div>
      </div>
    </section>
  )
}
