import type { Metadata } from "next"
import ClientProvidersPage from "./ClientProvidersPage"

export const metadata: Metadata = {
  title: "Profissionais | Cliente",
  description: "Encontre e contrate os melhores profissionais da sua região",
}

export default function Page() {
  return <ClientProvidersPage />
}
