import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { supabase } from "../../lib/supabase"
import { formString } from "../../lib/form"
import { Button } from "../../components/ui/button"
import { Field, Input, Select } from "../../components/ui/field"

export function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const form = new FormData(event.currentTarget)
    const { error } = await supabase.auth.signInWithPassword({
      email: formString(form, "email"),
      password: formString(form, "password")
    })
    setLoading(false)
    if (error) {
      toast.error("Email ou senha inválidos.")
      return
    }
    void navigate("/")
  }

  return <AuthPanel title="Entrar na sua conta" onSubmit={submit} loading={loading} mode="login" />
}

export function RegisterPage() {
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const form = new FormData(event.currentTarget)
    const password = formString(form, "password")
    const confirmation = formString(form, "confirmation")
    if (password !== confirmation) {
      setLoading(false)
      toast.error("As senhas não coincidem.")
      return
    }
    const { error } = await supabase.auth.signUp({
      email: formString(form, "email"),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
        data: {
          name: formString(form, "name"),
          phone: formString(form, "phone").replace(/\D/g, ""),
          role: formString(form, "role")
        }
      }
    })
    setLoading(false)
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success("Confira seu email para confirmar o cadastro.")
  }

  return <AuthPanel title="Crie sua conta" onSubmit={submit} loading={loading} mode="register" />
}

function AuthPanel({
  title,
  onSubmit,
  loading,
  mode
}: {
  title: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  loading: boolean
  mode: "login" | "register"
}) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl place-items-center px-4 py-10">
      <form
        onSubmit={(event) => {
          void onSubmit(event)
        }}
        className="w-full max-w-md border border-slate-200 bg-white p-7 shadow-soft"
      >
        <h1 className="text-2xl font-black">{title}</h1>
        <div className="mt-6 grid gap-4">
          {mode === "register" ? (
            <>
              <Field label="Nome completo">
                <Input name="name" required minLength={2} />
              </Field>
              <Field label="Telefone">
                <Input name="phone" type="tel" required placeholder="(11) 99999-9999" />
              </Field>
              <Field label="Tipo de conta">
                <Select name="role" defaultValue="client">
                  <option value="client">Preciso de um serviço</option>
                  <option value="provider">Quero oferecer serviços</option>
                </Select>
              </Field>
            </>
          ) : null}
          <Field label="Email">
            <Input name="email" type="email" required autoComplete="email" />
          </Field>
          <Field label="Senha">
            <Input name="password" type="password" required minLength={8} autoComplete="current-password" />
          </Field>
          {mode === "register" ? (
            <Field label="Confirmar senha">
              <Input name="confirmation" type="password" required minLength={8} />
            </Field>
          ) : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
          </Button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-600">
          {mode === "login" ? "Ainda não tem conta? " : "Já possui conta? "}
          <Link className="font-semibold text-brand-700" to={mode === "login" ? "/register" : "/login"}>
            {mode === "login" ? "Cadastre-se" : "Entrar"}
          </Link>
        </p>
      </form>
    </main>
  )
}

export function ForgotPasswordPage() {
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = formString(new FormData(event.currentTarget), "email")
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) toast.error(error.message)
    else toast.success("Enviamos as instruções para seu email.")
  }

  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <form
        onSubmit={(event) => {
          void submit(event)
        }}
        className="border border-slate-200 bg-white p-7 shadow-soft"
      >
        <h1 className="text-2xl font-black">Recuperar senha</h1>
        <div className="mt-6 grid gap-4">
          <Field label="Email">
            <Input name="email" type="email" required />
          </Field>
          <Button>Enviar instruções</Button>
        </div>
      </form>
    </main>
  )
}

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const password = formString(new FormData(event.currentTarget), "password")
    const { error } = await supabase.auth.updateUser({ password })
    if (error) toast.error(error.message)
    else {
      toast.success("Senha atualizada.")
      void navigate("/")
    }
  }
  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <form
        onSubmit={(event) => {
          void submit(event)
        }}
        className="border border-slate-200 bg-white p-7 shadow-soft"
      >
        <h1 className="text-2xl font-black">Nova senha</h1>
        <div className="mt-6 grid gap-4">
          <Field label="Senha">
            <Input name="password" type="password" minLength={8} required />
          </Field>
          <Button>Atualizar senha</Button>
        </div>
      </form>
    </main>
  )
}
