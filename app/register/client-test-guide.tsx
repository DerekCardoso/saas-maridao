"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ClientTestGuide() {
  const testData = {
    name: "Carlos Silva",
    email: "carlos.silva@exemplo.com",
    phone: "(11) 96666-6666",
    password: "senha123",
    cep: "04538132",
    address: {
      street: "Av. Faria Lima",
      number: "1500",
      complement: "Apto 205",
      neighborhood: "Itaim Bibi",
      city: "São Paulo",
      state: "SP",
    },
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📋 Guia de Teste Manual - Cliente
          <Badge variant="secondary">Dados Sugeridos</Badge>
        </CardTitle>
        <CardDescription>Use estes dados para testar o formulário de registro manual</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Dados Pessoais</h4>
            <div className="space-y-1 text-sm">
              <div>
                <span className="font-medium">Nome:</span> {testData.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {testData.email}
              </div>
              <div>
                <span className="font-medium">Telefone:</span> {testData.phone}
              </div>
              <div>
                <span className="font-medium">Senha:</span> {testData.password}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Endereço</h4>
            <div className="space-y-1 text-sm">
              <div>
                <span className="font-medium">CEP:</span> {testData.cep}{" "}
                <Badge variant="outline" className="text-xs">
                  Auto-preenchimento
                </Badge>
              </div>
              <div>
                <span className="font-medium">Rua:</span> {testData.address.street}
              </div>
              <div>
                <span className="font-medium">Número:</span> {testData.address.number}
              </div>
              <div>
                <span className="font-medium">Complemento:</span> {testData.address.complement}
              </div>
              <div>
                <span className="font-medium">Bairro:</span> {testData.address.neighborhood}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-sm text-blue-800 mb-2">💡 Dicas de Teste</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Digite o CEP primeiro para auto-preenchimento do endereço</li>
            <li>• Certifique-se de que as senhas coincidem</li>
            <li>• Mantenha a aba "Cliente" selecionada</li>
            <li>• Observe as notificações de sucesso/erro</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
