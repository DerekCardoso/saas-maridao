"use client"

import type React from "react"
import { AuthProvider } from "@/hooks/use-auth"
import dynamic from "next/dynamic"

const DynamicProviders = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}

// Exportar o componente com carregamento dinâmico
export const Providers = dynamic(() => Promise.resolve(DynamicProviders), {
  ssr: false,
})
