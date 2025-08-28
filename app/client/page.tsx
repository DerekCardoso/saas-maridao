import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientDashboard } from "@/components/dashboard/client-dashboard"

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <ClientDashboard />
      </main>
      <Footer />
    </div>
  )
}
