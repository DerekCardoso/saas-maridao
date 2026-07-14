import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | Maridão",
  description: "Faça login na plataforma Maridão",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
              <p className="text-muted-foreground">Faça login para acessar sua conta</p>
            </div>

            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Cliente</TabsTrigger>
                <TabsTrigger value="provider">Prestador</TabsTrigger>
              </TabsList>

              <TabsContent value="client">
                <Card>
                  <CardHeader>
                    <CardTitle>Login de Cliente</CardTitle>
                    <CardDescription>Acesse sua conta para gerenciar seus agendamentos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LoginForm />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="provider">
                <Card>
                  <CardHeader>
                    <CardTitle>Login de Prestador</CardTitle>
                    <CardDescription>Acesse sua conta para gerenciar seus serviços</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LoginForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
