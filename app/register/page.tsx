import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegisterForm } from "@/components/auth/register-form"
import { TestRegistration } from "./test-registration"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="register">Cadastro</TabsTrigger>
            <TabsTrigger value="test">Teste</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>

          <TabsContent value="test">
            <TestRegistration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
