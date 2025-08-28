import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function AdminUsersHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>
        <p className="text-muted-foreground">Gerencie os usuários da plataforma Maridão.</p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Usuário
      </Button>
    </div>
  )
}
