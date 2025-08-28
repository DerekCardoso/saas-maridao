import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"

export function ProviderAppointmentsStats() {
  const stats = [
    {
      title: "Pendentes",
      value: "3",
      description: "Aguardando sua resposta",
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    {
      title: "Confirmados",
      value: "8",
      description: "Próximos agendamentos",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Em Andamento",
      value: "2",
      description: "Serviços ativos",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Concluídos Hoje",
      value: "5",
      description: "Serviços finalizados",
      icon: CheckCircle,
      color: "text-green-600",
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
