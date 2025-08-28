import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, TrendingUp, Users, MessageSquare } from "lucide-react"

export function ProviderReviewsStats() {
  const stats = [
    {
      title: "Avaliação Média",
      value: "4.8",
      description: "De 5 estrelas",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Total de Avaliações",
      value: "127",
      description: "Avaliações recebidas",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Clientes Satisfeitos",
      value: "98%",
      description: "4-5 estrelas",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Tendência",
      value: "+12%",
      description: "Últimos 30 dias",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
