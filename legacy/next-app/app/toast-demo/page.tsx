"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToastContext } from "@/contexts/toast-context"
import { useState } from "react"

export default function ToastDemo() {
  const toast = useToastContext()
  const [count, setCount] = useState(0)

  const showSuccessToast = () => {
    toast.success({
      title: "Operação concluída",
      description: `Sua operação foi concluída com sucesso! (${count})`,
    })
    setCount((prev) => prev + 1)
  }

  const showErrorToast = () => {
    toast.error({
      title: "Erro",
      description: `Ocorreu um erro ao processar sua solicitação. (${count})`,
    })
    setCount((prev) => prev + 1)
  }

  const showWarningToast = () => {
    toast.warning({
      title: "Atenção",
      description: `Esta ação pode ter consequências irreversíveis. (${count})`,
    })
    setCount((prev) => prev + 1)
  }

  const showInfoToast = () => {
    toast.info({
      title: "Informação",
      description: `Aqui está uma informação importante para você. (${count})`,
    })
    setCount((prev) => prev + 1)
  }

  const showActionToast = () => {
    toast.info({
      title: "Ação necessária",
      description: "Você precisa confirmar esta ação.",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            toast.success({
              title: "Ação confirmada",
              description: "Você confirmou a ação com sucesso!",
            })
          }}
          className="mt-2"
        >
          Confirmar
        </Button>
      ),
    })
    setCount((prev) => prev + 1)
  }

  const showMultipleToasts = () => {
    toast.success({
      title: "Primeiro toast",
      description: "Este é o primeiro toast de uma série.",
    })

    setTimeout(() => {
      toast.info({
        title: "Segundo toast",
        description: "Este é o segundo toast de uma série.",
      })
    }, 1000)

    setTimeout(() => {
      toast.warning({
        title: "Terceiro toast",
        description: "Este é o terceiro toast de uma série.",
      })
    }, 2000)

    setTimeout(() => {
      toast.error({
        title: "Quarto toast",
        description: "Este é o quarto toast de uma série.",
      })
    }, 3000)
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Demonstração de Toasts</CardTitle>
          <CardDescription>
            Clique nos botões abaixo para ver os diferentes tipos de toasts disponíveis.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button onClick={showSuccessToast} className="bg-green-600 hover:bg-green-700">
            Toast de Sucesso
          </Button>
          <Button onClick={showErrorToast} className="bg-red-600 hover:bg-red-700">
            Toast de Erro
          </Button>
          <Button onClick={showWarningToast} className="bg-amber-600 hover:bg-amber-700">
            Toast de Aviso
          </Button>
          <Button onClick={showInfoToast} className="bg-blue-600 hover:bg-blue-700">
            Toast de Informação
          </Button>
          <Button onClick={showActionToast} className="bg-purple-600 hover:bg-purple-700">
            Toast com Ação
          </Button>
          <Button onClick={showMultipleToasts} className="bg-gray-600 hover:bg-gray-700">
            Múltiplos Toasts
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
