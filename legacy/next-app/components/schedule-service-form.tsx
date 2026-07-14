"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoginForm } from "./auth/login-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegisterForm } from "./auth/register-form"

interface ScheduleServiceFormProps {
  providerId: string
  providerName: string
  isLoggedIn?: boolean
}

export function ScheduleServiceForm({ providerId, providerName, isLoggedIn = false }: ScheduleServiceFormProps) {
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [service, setService] = useState<string>("")
  const [details, setDetails] = useState<string>("")
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      setShowAuthDialog(true)
      return
    }

    // Aqui você implementaria a lógica para enviar o agendamento
    try {
      // Simulação de envio de agendamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Agendamento solicitado",
        description: `Seu agendamento com ${providerName} foi solicitado com sucesso!`,
        variant: "default",
      })

      // Redirecionar para a página de agendamentos do cliente
      router.push("/dashboard/client/appointments")
    } catch (error) {
      toast({
        title: "Erro ao agendar",
        description: "Ocorreu um erro ao solicitar o agendamento. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleAuthSuccess = () => {
    setShowAuthDialog(false)
    // Após o login bem-sucedido, resubmeter o formulário
    handleSubmit(new Event("submit") as any)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Serviço</label>
          <Select value={service} onValueChange={setService} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instalacao-tomadas">Instalação de Tomadas</SelectItem>
              <SelectItem value="troca-disjuntores">Troca de Disjuntores</SelectItem>
              <SelectItem value="instalacao-luminarias">Instalação de Luminárias</SelectItem>
              <SelectItem value="reparo-curto-circuito">Reparo em Curto-Circuito</SelectItem>
              <SelectItem value="instalacao-ventilador">Instalação de Ventilador de Teto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Data</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) =>
                  date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Horário</label>
          <Select value={timeSlot} onValueChange={setTimeSlot} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um horário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="08:00">08:00</SelectItem>
              <SelectItem value="09:00">09:00</SelectItem>
              <SelectItem value="10:00">10:00</SelectItem>
              <SelectItem value="11:00">11:00</SelectItem>
              <SelectItem value="13:00">13:00</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
              <SelectItem value="15:00">15:00</SelectItem>
              <SelectItem value="16:00">16:00</SelectItem>
              <SelectItem value="17:00">17:00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Detalhes adicionais</label>
          <Textarea
            placeholder="Descreva detalhes sobre o serviço ou informações importantes para o prestador"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Solicitar Agendamento
        </Button>
      </form>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Faça login para continuar</DialogTitle>
            <DialogDescription>
              Para agendar um serviço, você precisa estar logado. Se ainda não tem uma conta, você pode criar agora.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm onSuccess={handleAuthSuccess} redirectUrl={`/provider/${providerId}`} hideLinks />
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm
                onSuccess={handleAuthSuccess}
                redirectUrl={`/provider/${providerId}`}
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
