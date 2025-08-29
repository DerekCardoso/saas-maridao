import { Suspense } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { TestLogin } from "./test-login"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="test">Teste</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <Suspense fallback={<div>Carregando...</div>}>
              <LoginForm />
            </Suspense>
          </TabsContent>

          <TabsContent value="test" className="mt-6">
            <TestLogin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
