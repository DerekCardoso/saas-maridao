import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  // Dados simulados de atividade recente
  const recentUsers = [
    { name: "João S.", location: "São Paulo, SP", service: "Elétrica" },
    { name: "Maria L.", location: "Rio de Janeiro, RJ", service: "Hidráulica" },
    { name: "Carlos M.", location: "Belo Horizonte, MG", service: "Montagem de Móveis" },
    { name: "Ana P.", location: "Curitiba, PR", service: "Reparos Gerais" },
    { name: "Roberto F.", location: "Salvador, BA", service: "Instalações" },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Atividade em tempo real</h2>
          <p className="text-muted-foreground mt-2">Acompanhe as estatísticas do Maridão</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                <Avatar>
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.location}</p>
                </div>
                <div className="text-sm text-right">
                  <p className="font-medium">{user.service}</p>
                  <p className="text-xs text-muted-foreground">agora mesmo</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>MAI/2025 a cada minuto, 3 novos serviços são agendados</p>
          </div>
        </div>
      </div>
    </section>
  )
}
