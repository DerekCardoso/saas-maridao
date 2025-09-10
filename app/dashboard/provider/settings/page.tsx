import type { Metadata } from "next"
import { Suspense } from "react"
import { ProviderSettingsForm } from "@/components/dashboard/provider-settings-form"

export const metadata: Metadata = {
  title: "Configurações | Prestador",
  description: "Gerencie suas configurações de conta e preferências",
}

export default function ProviderSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas configurações de conta, perfil e preferências.</p>
      </div>

      <Suspense fallback={<div>Carregando configurações...</div>}>
        <ProviderSettingsForm />
      </Suspense>
    </div>
  )
}
