import type { Metadata } from "next"
import { Suspense } from "react"
import { ProviderChatView } from "@/components/dashboard/provider-chat-view"

export const metadata: Metadata = {
  title: "Conversa | Prestador",
  description: "Conversa com cliente",
}

interface Props {
  params: {
    clientId: string
  }
}

export default function ProviderChatPage({ params }: Props) {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <Suspense fallback={<div>Carregando conversa...</div>}>
        <ProviderChatView clientId={params.clientId} />
      </Suspense>
    </div>
  )
}
