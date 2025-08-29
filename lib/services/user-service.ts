import bcrypt from "bcryptjs"
import { supabase, supabaseAdmin, testSupabaseConnection } from "../supabase"
import type { Address } from "../viacep"

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
  user_type: "client" | "provider" | "admin"
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

export async function createUser(
  userData: CreateUserData,
): Promise<{ success: boolean; error?: string; user?: UserResponse }> {
  try {
    console.log("🎯 Serviço: Iniciando criação de usuário", userData.email)

    // Test connection first
    const connectionTest = await testSupabaseConnection()
    if (!connectionTest.success) {
      console.error("❌ Falha na conexão com Supabase:", connectionTest.error)
      return {
        success: false,
        error: `Erro de conexão com o banco de dados: ${connectionTest.error}. Verifique se as variáveis de ambiente estão configuradas corretamente.`,
      }
    }

    console.log("✅ Conexão com Supabase OK")

    // Verificar se o email já existe usando admin client
    console.log("🔍 Verificando se email já existe...")
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from("users")
      .select("email")
      .eq("email", userData.email.toLowerCase())
      .maybeSingle()

    if (checkError) {
      console.error("❌ Erro ao verificar email existente:", checkError)
      return { success: false, error: `Erro ao verificar email: ${checkError.message}` }
    }

    if (existingUser) {
      console.error("❌ Email já existe:", userData.email)
      return { success: false, error: "Este email já está cadastrado. Tente fazer login ou use outro email." }
    }

    console.log("✅ Email disponível")

    // Hash da senha
    console.log("🔐 Gerando hash da senha...")
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    console.log("✅ Senha hasheada com sucesso")

    // Criar usuário usando admin client para bypass RLS
    console.log("👤 Criando usuário no banco...")
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .insert({
        email: userData.email.toLowerCase(),
        name: userData.name,
        phone: userData.phone || null,
        user_type: userData.userType,
        password: hashedPassword,
        is_admin: false,
      })
      .select()
      .single()

    if (userError) {
      console.error("❌ Erro ao criar usuário:", userError)
      return { success: false, error: `Erro ao criar usuário: ${userError.message}` }
    }

    if (!user) {
      console.error("❌ Usuário não foi criado - dados vazios")
      return { success: false, error: "Usuário não foi criado - resposta vazia do banco" }
    }

    console.log("✅ Usuário criado com sucesso:", user.id)

    // Criar endereço se fornecido
    if (userData.address) {
      console.log("🏠 Criando endereço...")
      const { error: addressError } = await supabaseAdmin.from("addresses").insert({
        user_id: user.id,
        street: userData.address.street,
        number: userData.address.number || null,
        complement: userData.address.complement || null,
        neighborhood: userData.address.neighborhood,
        city: userData.address.city,
        state: userData.address.state,
        cep: userData.address.cep,
        is_primary: true,
      })

      if (addressError) {
        console.error("⚠️ Erro ao criar endereço (não crítico):", addressError)
      } else {
        console.log("✅ Endereço criado com sucesso")
      }
    }

    // Criar registro específico do tipo de usuário
    if (userData.userType === "client") {
      console.log("👥 Criando registro de cliente...")
      const { error: clientError } = await supabaseAdmin.from("clients").insert({
        user_id: user.id,
      })

      if (clientError) {
        console.error("❌ Erro ao criar cliente:", clientError)
        return { success: false, error: `Erro ao criar cliente: ${clientError.message}` }
      }
      console.log("✅ Cliente criado com sucesso")
    } else if (userData.userType === "provider") {
      console.log("🔧 Criando registro de prestador...")
      const { data: provider, error: providerError } = await supabaseAdmin
        .from("providers")
        .insert({
          user_id: user.id,
          bio: userData.bio || null,
          experience_years: userData.experienceYears || null,
          is_premium: userData.isPremium || false,
          is_available: true,
          rating: 0,
          total_services: 0,
          category_ids: [],
        })
        .select()
        .single()

      if (providerError) {
        console.error("❌ Erro ao criar prestador:", providerError)
        return { success: false, error: `Erro ao criar prestador: ${providerError.message}` }
      }

      console.log("✅ Prestador criado com sucesso:", provider.id)

      // Criar especialidades se fornecidas
      if (provider && userData.specialties && userData.specialties.length > 0) {
        console.log("🎯 Criando especialidades...")
        const specialties = userData.specialties.map((specialty) => ({
          provider_id: provider.id,
          name: specialty,
        }))

        const { error: specialtiesError } = await supabaseAdmin.from("provider_specialties").insert(specialties)

        if (specialtiesError) {
          console.error("⚠️ Erro ao criar especialidades (não crítico):", specialtiesError)
        } else {
          console.log("✅ Especialidades criadas com sucesso")
        }
      }
    }

    console.log("🎉 Usuário criado completamente com sucesso!")

    const userResponse: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      userType: user.user_type as "client" | "provider" | "admin",
      address: userData.address,
      isPremium: userData.isPremium,
      specialties: userData.specialties,
      bio: userData.bio,
    }

    return { success: true, user: userResponse }
  } catch (error) {
    console.error("💥 Erro detalhado ao criar usuário:", error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: "Erro inesperado ao criar usuário. Tente novamente." }
  }
}

export async function validateUserCredentials(email: string, password: string): Promise<UserResponse | null> {
  try {
    console.log("🔍 Validando credenciais para:", email)

    // Test connection first
    const connectionTest = await testSupabaseConnection()
    if (!connectionTest.success) {
      console.error("❌ Falha na conexão com Supabase:", connectionTest.error)
      return null
    }

    // Use admin client to bypass RLS for authentication
    const { data: user, error } = await supabaseAdmin
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
    const isPasswordValid = await bcrypt.compare(password, typedUser.password)

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
    const { data: user, error } = await supabaseAdmin
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
