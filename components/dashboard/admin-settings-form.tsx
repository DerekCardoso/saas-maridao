"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToastContext } from "@/contexts/toast-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminSettingsForm() {
  const toast = useToastContext()
  const [isLoading, setIsLoading] = useState(false)

  // Dados mockados das configurações
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Maridão",
    siteDescription: "Plataforma de serviços para o lar",
    contactEmail: "contato@maridao.com",
    supportPhone: "(11) 98765-4321",
    maintenanceMode: false,
  })

  // Configurações de serviços
  const [serviceSettings, setServiceSettings] = useState({
    maxServicesPerProvider: "10",
    maxAppointmentsPerDay: "5",
    appointmentTimeSlots: "60",
    allowInstantBooking: true,
    requireApproval: true,
    allowCancellation: true,
    cancellationTimeLimit: "24",
  })

  // Configurações de pagamento
  const [paymentSettings, setPaymentSettings] = useState({
    currency: "BRL",
    taxRate: "5",
    platformFee: "10",
    minimumWithdrawal: "50",
    paymentMethods: ["credit_card", "pix", "bank_transfer"],
    automaticPayouts: true,
    payoutFrequency: "weekly",
  })

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulando uma chamada de API com um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success({
        title: "Configurações atualizadas",
        description: "As configurações gerais foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast.error({
        title: "Erro ao atualizar configurações",
        description: "Ocorreu um erro ao atualizar as configurações. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulando uma chamada de API com um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success({
        title: "Configurações atualizadas",
        description: "As configurações de serviços foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast.error({
        title: "Erro ao atualizar configurações",
        description: "Ocorreu um erro ao atualizar as configurações. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulando uma chamada de API com um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success({
        title: "Configurações atualizadas",
        description: "As configurações de pagamento foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast.error({
        title: "Erro ao atualizar configurações",
        description: "Ocorreu um erro ao atualizar as configurações. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">Geral</TabsTrigger>
        <TabsTrigger value="services">Serviços</TabsTrigger>
        <TabsTrigger value="payment">Pagamentos</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
            <CardDescription>Configure as informações básicas da plataforma.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="general-form" onSubmit={handleGeneralSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contato</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="siteDescription">Descrição do Site</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Telefone de Suporte</Label>
                  <Input
                    id="supportPhone"
                    value={generalSettings.supportPhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceMode">Modo de Manutenção</Label>
                    <Switch
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setGeneralSettings({ ...generalSettings, maintenanceMode: checked })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ativar o modo de manutenção tornará o site inacessível para usuários comuns.
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="general-form" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="services">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Serviços</CardTitle>
            <CardDescription>Configure as regras e limites para os serviços da plataforma.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="services-form" onSubmit={handleServiceSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxServicesPerProvider">Máximo de Serviços por Prestador</Label>
                  <Input
                    id="maxServicesPerProvider"
                    type="number"
                    value={serviceSettings.maxServicesPerProvider}
                    onChange={(e) => setServiceSettings({ ...serviceSettings, maxServicesPerProvider: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAppointmentsPerDay">Máximo de Agendamentos por Dia</Label>
                  <Input
                    id="maxAppointmentsPerDay"
                    type="number"
                    value={serviceSettings.maxAppointmentsPerDay}
                    onChange={(e) => setServiceSettings({ ...serviceSettings, maxAppointmentsPerDay: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointmentTimeSlots">Duração dos Slots de Tempo (minutos)</Label>
                  <Input
                    id="appointmentTimeSlots"
                    type="number"
                    value={serviceSettings.appointmentTimeSlots}
                    onChange={(e) => setServiceSettings({ ...serviceSettings, appointmentTimeSlots: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cancellationTimeLimit">Limite de Tempo para Cancelamento (horas)</Label>
                  <Input
                    id="cancellationTimeLimit"
                    type="number"
                    value={serviceSettings.cancellationTimeLimit}
                    onChange={(e) => setServiceSettings({ ...serviceSettings, cancellationTimeLimit: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allowInstantBooking">Permitir Agendamento Instantâneo</Label>
                    <Switch
                      id="allowInstantBooking"
                      checked={serviceSettings.allowInstantBooking}
                      onCheckedChange={(checked) =>
                        setServiceSettings({ ...serviceSettings, allowInstantBooking: checked })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireApproval">Exigir Aprovação do Prestador</Label>
                    <Switch
                      id="requireApproval"
                      checked={serviceSettings.requireApproval}
                      onCheckedChange={(checked) =>
                        setServiceSettings({ ...serviceSettings, requireApproval: checked })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allowCancellation">Permitir Cancelamento</Label>
                    <Switch
                      id="allowCancellation"
                      checked={serviceSettings.allowCancellation}
                      onCheckedChange={(checked) =>
                        setServiceSettings({ ...serviceSettings, allowCancellation: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="services-form" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="payment">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Pagamento</CardTitle>
            <CardDescription>Configure as opções de pagamento e taxas da plataforma.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Select
                    value={paymentSettings.currency}
                    onValueChange={(value) => setPaymentSettings({ ...paymentSettings, currency: value })}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Selecione a moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real Brasileiro (BRL)</SelectItem>
                      <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxRate">Taxa de Imposto (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={paymentSettings.taxRate}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, taxRate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platformFee">Taxa da Plataforma (%)</Label>
                  <Input
                    id="platformFee"
                    type="number"
                    value={paymentSettings.platformFee}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, platformFee: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumWithdrawal">Valor Mínimo para Saque (R$)</Label>
                  <Input
                    id="minimumWithdrawal"
                    type="number"
                    value={paymentSettings.minimumWithdrawal}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, minimumWithdrawal: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payoutFrequency">Frequência de Pagamentos</Label>
                  <Select
                    value={paymentSettings.payoutFrequency}
                    onValueChange={(value) => setPaymentSettings({ ...paymentSettings, payoutFrequency: value })}
                  >
                    <SelectTrigger id="payoutFrequency">
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="biweekly">Quinzenal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="automaticPayouts">Pagamentos Automáticos</Label>
                    <Switch
                      id="automaticPayouts"
                      checked={paymentSettings.automaticPayouts}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, automaticPayouts: checked })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ativar pagamentos automáticos para prestadores de serviço.
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="payment-form" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
