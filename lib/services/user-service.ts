import { compare } from "bcrypt"
import { supabase } from "../supabase"
import type { Address } from "../viacep"
import { createUser as createUserAuth } from "@/lib/auth"

interface SupabaseProvider {
  is_premium: boolean
  provider_specialties: Array<{ name: string }>
  bio?: string
}

interface SupabaseAddress {
  cep: string
  street: string
  number?: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

interface SupabaseUser {
  id: string
  name: string
  email: string
  phone: string | null
  is_admin: boolean
  password: string
  providers?: SupabaseProvider[]
  clients?: any[]
  addresses?: SupabaseAddress[]
}

export interface CreateUserData {
  name: string
  email: string
  password: string
  phone?: string
  userType: "client" | "provider"
  address?: {
    street: string
    number?: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    cep: string
  }
  isPremium?: boolean
  specialties?: string[]
  bio?: string
  experienceYears?: number
}

export interface UserResponse {
  id: string
  name: string
  email: string
  phone: string
  userType: "client" | "provider" | "admin"
  address?: Address & { number?: string }
  isPremium?: boolean
  specialties?: string[]
  bio?: string
}

export async function createUser(userData: CreateUserData): Promise<UserResponse> {
  try {
    console.log("🎯 Serviço: Iniciando criação de usuário", userData.email)

    const user = await createUserAuth({
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      userType: userData.userType,
      password: userData.password,
      address: userData.address,
      providerData:
        userData.userType === "provider"
          ? {
              bio: userData.bio,
              experienceYears: userData.experienceYears,
              isPremium: userData.isPremium,
              specialties: userData.specialties,
            }
          : undefined,
    })

    if (!user) {
      throw new Error("Falha ao criar usuário - resposta vazia")
    }

    console.log("🎉 Serviço: Usuário criado com sucesso", user.id)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: userData.phone || "",
      userType: user.userType,
      isPremium: userData.isPremium,
      specialties: userData.specialties,
      bio: userData.bio,
    }
  } catch (error) {
    console.error("💥 Erro no serviço de criação de usuário:", error)

    // Se o erro já tem uma mensagem específica, usar ela
    if (error instanceof Error) {
      throw error
    }

    // Caso contrário, criar uma mensagem genérica
    throw new Error("Erro inesperado no serviço. Tente novamente.")
  }
}

export async function validateUserCredentials(email: string, password: string): Promise<UserResponse | null> {
  try {
    console.log("🔍 Validando credenciais para:", email)

    const { data: user, error } = await supabase
      .from("users")
      .select(`
        *,
        clients (*),
        providers (
          *,
          provider_specialties (*)
        ),
        addresses (*)
      `)
      .eq("email", email.toLowerCase())
      .single()

    if (error || !user) {
      console.log("❌ Usuário não encontrado:", email)
      return null
    }

    const typedUser = user as unknown as SupabaseUser

    // Verificar senha
    const isPasswordValid = await compare(password, typedUser.password)

    if (!isPasswordValid) {
      console.log("❌ Senha inválida para:", email)
      return null
    }

    console.log("✅ Credenciais válidas para:", email)

    // Determinar tipo de usuário e dados específicos
    let userType: "client" | "provider" | "admin" = "client"
    let isPremium: boolean | undefined
    let specialties: string[] | undefined
    let bio: string | undefined

    if (typedUser.is_admin) {
      userType = "admin"
    } else if (typedUser.providers && typedUser.providers.length > 0) {
      userType = "provider"
      const provider = typedUser.providers[0]
      isPremium = provider.is_premium
      specialties = provider.provider_specialties?.map((s) => s.name) || []
      bio = provider.bio || undefined
    } else if (typedUser.clients && typedUser.clients.length > 0) {
      userType = "client"
    }

    // Buscar endereço
    const address =
      typedUser.addresses && typedUser.addresses.length > 0
        ? {
            logradouro: typedUser.addresses[0].street,
            bairro: typedUser.addresses[0].neighborhood,
            localidade: typedUser.addresses[0].city,
            uf: typedUser.addresses[0].state,
            cep: typedUser.addresses[0].cep,
            number: typedUser.addresses[0].number || undefined,
            complement: typedUser.addresses[0].complement || undefined,
          }
        : undefined

    return {
      id: typedUser.id,
      name: typedUser.name,
      email: typedUser.email,
      phone: typedUser.phone || "",
      userType,
      address,
      isPremium,
      specialties,
      bio,
    }
  } catch (error) {
    console.error("💥 Erro ao validar credenciais:", error)
    return null
  }
}

export async function getUserByEmailService(email: string): Promise<UserResponse | null> {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select(`
        *,
        clients (*),
        providers (
          *,
          provider_specialties (*)
        ),
        addresses (*)
      `)
      .eq("email", email.toLowerCase())
      .single()

    if (error || !user) {
      return null
    }

    const typedUser = user as unknown as SupabaseUser

    let userType: "client" | "provider" | "admin" = "client"
    let isPremium: boolean | undefined
    let specialties: string[] | undefined
    let bio: string | undefined

    if (typedUser.is_admin) {
      userType = "admin"
    } else if (typedUser.providers && typedUser.providers.length > 0) {
      userType = "provider"
      const provider = typedUser.providers[0]
      isPremium = provider.is_premium
      specialties = provider.provider_specialties?.map((s) => s.name) || []
      bio = provider.bio || undefined
    } else if (typedUser.clients && typedUser.clients.length > 0) {
      userType = "client"
    }

    const address =
      typedUser.addresses && typedUser.addresses.length > 0
        ? {
            logradouro: typedUser.addresses[0].street,
            bairro: typedUser.addresses[0].neighborhood,
            localidade: typedUser.addresses[0].city,
            uf: typedUser.addresses[0].state,
            cep: typedUser.addresses[0].cep,
            number: typedUser.addresses[0].number || undefined,
            complement: typedUser.addresses[0].complement || undefined,
          }
        : undefined

    return {
      id: typedUser.id,
      name: typedUser.name,
      email: typedUser.email,
      phone: typedUser.phone || "",
      userType,
      address,
      isPremium,
      specialties,
      bio,
    }
  } catch (error) {
    console.error("💥 Erro ao buscar usuário:", error)
    return null
  }
}

export async function getAllUsersService() {
  try {
    const { data: users, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return users || []
  } catch (error) {
    console.error("💥 Erro ao buscar usuários:", error)
    return []
  }
}

export async function getUserService(id: string) {
  try {
    const { data: user, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error) throw error
    return user
  } catch (error) {
    console.error("💥 Erro ao buscar usuário:", error)
    return null
  }
}

export async function updateUserService(id: string, userData: any) {
  try {
    const { data: user, error } = await supabase.from("users").update(userData).eq("id", id).select().single()

    if (error) throw error
    return user
  } catch (error) {
    console.error("💥 Erro ao atualizar usuário:", error)
    return null
  }
}

export async function deleteUserService(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("users").delete().eq("id", id)

    if (error) throw error
    return true
  } catch (error) {
    console.error("💥 Erro ao deletar usuário:", error)
    return false
  }
}
