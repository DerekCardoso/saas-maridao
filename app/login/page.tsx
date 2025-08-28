import { LoginForm } from "@/components/auth/login-form"
import { TestLogin } from "./test-login"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Entrar</h1>
            <p className="text-muted-foreground mt-2">Acesse sua conta na plataforma Maridão</p>
          </div>

          <TestLogin />
          <LoginForm />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <a href="/register" className="text-primary hover:underline font-medium">
                Criar conta
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
