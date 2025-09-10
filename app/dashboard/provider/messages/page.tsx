import type { Metadata } from "next"
import { Suspense } from "react"
import { ProviderMessagesHeader } from "@/components/dashboard/provider-messages-header"
import { ProviderMessagesList } from "@/components/dashboard/provider-messages-list"

export const metadata: Metadata = {
  title: "Mensagens | Prestador",
  description: "Gerencie suas conversas com clientes",
}

export default function ProviderMessagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <ProviderMessagesHeader />

      <Suspense fallback={<div>Carregando mensagens...</div>}>
        <ProviderMessagesList />
      </Suspense>
    </div>
  )
}
