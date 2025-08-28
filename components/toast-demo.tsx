"use client"

import { Button } from "@/components/ui/button"
import { useToastContext } from "@/contexts/toast-context"

export function ToastDemo() {
  const toast = useToastContext()

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Demonstração de Toasts</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Button
          onClick={() =>
            toast.success({
              title: "Operação concluída",
              description: "A operação foi concluída com sucesso!",
            })
          }
          className="bg-green-600 hover:bg-green-700"
        >
          Sucesso
        </Button>
        <Button
          onClick={() =>
            toast.error({
              title: "Erro",
              description: "Ocorreu um erro ao processar sua solicitação.",
            })
          }
          className="bg-red-600 hover:bg-red-700"
        >
          Erro
        </Button>
        <Button
          onClick={() =>
            toast.warning({
              title: "Atenção",
              description: "Esta ação pode ter consequências irreversíveis.",
            })
          }
          className="bg-amber-600 hover:bg-amber-700"
        >
          Aviso
        </Button>
        <Button
          onClick={() =>
            toast.info({
              title: "Informação",
              description: "Aqui está uma informação importante para você.",
            })
          }
          className="bg-blue-600 hover:bg-blue-700"
        >
          Informação
        </Button>
      </div>
    </div>
  )
}
