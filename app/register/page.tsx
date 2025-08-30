import type { Metadata } from "next"
import RegisterClientPage from "./register-client-page"

export const metadata: Metadata = {
  title: "Cadastro | Maridão",
  description: "Crie sua conta na plataforma Maridão",
}

export default function RegisterPage() {
  return <RegisterClientPage />
}
