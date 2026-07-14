"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "../auth/login-form"
import { RegisterForm } from "../auth/register-form"

interface ChatButtonProps {
  providerId: string
  providerName: string
  isLoggedIn?: boolean
}

export function ChatButton({ providerId, providerName, isLoggedIn = false }: ChatButtonProps) {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (isLoggedIn) {
      router.push(`/dashboard/client/messages/${providerId}`)
    } else {
      setShowAuthDialog(true)
    }
  }

  const handleAuthSuccess = () => {
    setShowAuthDialog(false)
    router.push(`/dashboard/client/messages/${providerId}`)
  }

  return (
    <>
      <Button onClick={handleClick} variant="outline" className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        <span>Chat</span>
      </Button>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Faça login para continuar</DialogTitle>
            <DialogDescription>
              Para conversar com {providerName}, você precisa estar logado. Se ainda não tem uma conta, você pode criar
              agora.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm
                onSuccess={handleAuthSuccess}
                redirectUrl={`/dashboard/client/messages/${providerId}`}
                hideLinks
              />
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm
                onSuccess={handleAuthSuccess}
                redirectUrl={`/dashboard/client/messages/${providerId}`}
                defaultType="client"
                hideLinks
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
