import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"

export function ClientAppointmentsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meus Agendamentos</h1>
        <p className="text-muted-foreground">Gerencie seus agendamentos de serviços e acompanhe o status.</p>
      </div>
      <Button asChild>
        <Link href="/search">
          <Search className="mr-2 h-4 w-4" />
          Buscar Profissionais
        </Link>
      </Button>
    </div>
  )
}
