import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function AdminReportsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Visualize relatórios e estatísticas da plataforma Maridão.</p>
      </div>
      <Button>
        <Download className="mr-2 h-4 w-4" />
        Exportar Relatórios
      </Button>
    </div>
  )
}
