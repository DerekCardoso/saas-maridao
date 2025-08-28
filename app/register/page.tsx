import { RegisterForm } from "@/components/auth/register-form"
import { TestRegistration } from "./test-registration"
import { ClientTestGuide } from "./client-test-guide"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4">
          <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Criar Conta</h1>
              <p className="text-gray-600 mt-2">Junte-se à plataforma Maridão</p>
            </div>

            {/* Testes Rápidos */}
            <TestRegistration />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Formulário */}
              <div>
                <RegisterForm />
              </div>

            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <a href="/login" className="text-primary hover:underline font-medium">
                  Fazer login
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
