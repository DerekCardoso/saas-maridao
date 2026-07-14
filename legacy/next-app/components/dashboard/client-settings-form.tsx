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
import { Separator } from "@/components/ui/separator"

export function ClientSettingsForm() {
  const toast = useToastContext()
  const [isLoading, setIsLoading] = useState(false)

  // Dados mockados do usuário
  const [userData, setUserData] = useState({
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
  })

  // Configurações de notificação
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newServices: true,
    statusUpdates: true,
    promotions: false,
  })

  // Configurações de privacidade
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showReviews: true,
    allowContact: true,
  })

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulando uma chamada de API com um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast.error({
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao atualizar suas informações. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulando uma chamada de API com um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success({
        title: "Notificações atualizadas",
        description: "Suas preferências de notificação foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast.error({
        title: "Erro ao atualizar notificações",
        description: "Ocorreu um erro ao atualizar suas preferências. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrivacySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulando uma chamada de API com um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success({
        title: "Privacidade atualizada",
        description: "Suas configurações de privacidade foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast.error({
        title: "Erro ao atualizar privacidade",
        description: "Ocorreu um erro ao atualizar suas configurações. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList>
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
        <TabsTrigger value="privacy">Privacidade</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais e de contato.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="profile-form" onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={userData.state}
                    onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={userData.zipCode}
                    onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="profile-form" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Preferências de Notificação</CardTitle>
            <CardDescription>Escolha como e quando deseja receber notificações.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="notifications-form" onSubmit={handleNotificationsSubmit} className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canais de Notificação</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email</Label>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">SMS</Label>
                    <Switch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Notificações Push</Label>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Tipos de Notificação</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-services">Novos Serviços Disponíveis</Label>
                    <Switch
                      id="new-services"
                      checked={notifications.newServices}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newServices: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="status-updates">Atualizações de Status</Label>
                    <Switch
                      id="status-updates"
                      checked={notifications.statusUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, statusUpdates: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="promotions">Promoções e Ofertas</Label>
                    <Switch
                      id="promotions"
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="notifications-form" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Preferências"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="privacy">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Privacidade</CardTitle>
            <CardDescription>Controle quem pode ver suas informações e como elas são usadas.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="privacy-form" onSubmit={handlePrivacySubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-profile">Mostrar Perfil Publicamente</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que prestadores de serviço vejam seu perfil.
                    </p>
                  </div>
                  <Switch
                    id="show-profile"
                    checked={privacy.showProfile}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, showProfile: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-reviews">Mostrar Avaliações Publicamente</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que suas avaliações sejam vistas por outros usuários.
                    </p>
                  </div>
                  <Switch
                    id="show-reviews"
                    checked={privacy.showReviews}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, showReviews: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-contact">Permitir Contato Direto</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que prestadores de serviço entrem em contato diretamente com você.
                    </p>
                  </div>
                  <Switch
                    id="allow-contact"
                    checked={privacy.allowContact}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, allowContact: checked })}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="privacy-form" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Configurações"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
