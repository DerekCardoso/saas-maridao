import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { TestLogin } from "./test-login"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login - Maridão</h2>
          <p className="mt-2 text-sm text-gray-600">Entre na sua conta para acessar a plataforma</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="test">Teste</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-8">
            <LoginForm />
          </TabsContent>

          <TabsContent value="test" className="mt-8">
            <TestLogin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
