import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegisterForm } from "@/components/auth/register-form"
import { TestRegistration } from "./test-registration"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Cadastro - Maridão</h2>
          <p className="mt-2 text-sm text-gray-600">Crie sua conta para começar a usar nossa plataforma</p>
        </div>

        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register">Cadastro</TabsTrigger>
            <TabsTrigger value="test">Teste</TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="mt-8">
            <RegisterForm />
          </TabsContent>

          <TabsContent value="test" className="mt-8">
            <TestRegistration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
