import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProviderDashboard } from "@/components/dashboard/provider-dashboard"

export default function ProviderPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <ProviderDashboard />
      </main>
      <Footer />
    </div>
  )
}
