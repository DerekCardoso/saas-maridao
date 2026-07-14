import { supabase } from "./supabase"

const apiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3001/v1"

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message)
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  const headers = new Headers(init.headers)
  if (!(init.body instanceof FormData)) headers.set("content-type", "application/json")
  if (session?.access_token) headers.set("authorization", `Bearer ${session.access_token}`)

  const response = await fetch(`${apiUrl}${path}`, { ...init, headers })
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { code?: string; message?: string }
      | null
    throw new ApiError(
      response.status,
      payload?.code ?? "REQUEST_FAILED",
      payload?.message ?? "Não foi possível concluir a solicitação."
    )
  }

  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}
