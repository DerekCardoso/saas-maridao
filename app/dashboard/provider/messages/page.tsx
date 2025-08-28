import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProviderMessagesList } from "@/components/dashboard/provider-messages-list"
import { MessageSquare } from "lucide-react"

export default function ProviderMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
        <p className="text-muted-foreground">Converse com seus clientes e gerencie suas comunicações</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversas
          </CardTitle>
          <CardDescription>Suas conversas com clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <ProviderMessagesList />
        </CardContent>
      </Card>
    </div>
  )
}
