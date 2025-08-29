import { Suspense } from "react"
import { RegisterForm } from "@/components/auth/register-form"
import { ClientTestGuide } from "./client-test-guide"
import { TestRegistration } from "./test-registration"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="register">Cadastro</TabsTrigger>
            <TabsTrigger value="test">Teste</TabsTrigger>
            <TabsTrigger value="guide">Guia</TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="mt-6">
            <Suspense fallback={<div>Carregando...</div>}>
              <RegisterForm />
            </Suspense>
          </TabsContent>

          <TabsContent value="test" className="mt-6">
            <TestRegistration />
          </TabsContent>

          <TabsContent value="guide" className="mt-6">
            <ClientTestGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
