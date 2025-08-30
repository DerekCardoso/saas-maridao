"use client"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterClientPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("type") === "provider" ? "provider" : "client"
  const [showPremiumOption, setShowPremiumOption] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Crie sua conta</h1>
              <p className="text-muted-foreground">Cadastre-se para começar a usar a plataforma</p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
