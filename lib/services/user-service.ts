import bcrypt from "bcryptjs"
import { supabase, supabaseAdmin, testSupabaseConnection } from "../supabase"

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
  phone: string
  userType: "client" | "provider" | "admin"
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    cep: string
  }
  bio?: string
  experienceYears?: number
  specialties?: string[]
  isPremium?: boolean
}

export interface CreateUserResult {
  success: boolean
  user?: {
    id: string
    email: string
    name: string
    userType: string
  }
  error?: string
}

export async function createUser(userData: CreateUserData): Promise<CreateUserResult> {
  try {
    console.log("🚀 Iniciando criação de usuário:", userData.email)

    // Check if email already exists
    console.log("🔍 Verificando se email já existe...")
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from("users")
      .select("id, email")
      .eq("email", userData.email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("❌ Erro ao verificar email existente:", checkError)
      return {
        success: false,
        error: `Erro ao verificar email: ${checkError.message}`,
      }
    }

    if (existingUser) {
      console.log("⚠️ Email já existe:", userData.email)
      return {
        success: false,
        error: "Este email já está cadastrado",
      }
    }

    // Hash password
    console.log("🔐 Gerando hash da senha...")
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userData.password, saltRounds)

    // Create user
    console.log("👤 Criando usuário...")
    const { data: newUser, error: userError } = await supabaseAdmin
      .from("users")
      .insert({
        email: userData.email,
        password_hash: passwordHash,
        name: userData.name,
        phone: userData.phone,
        user_type: userData.userType,
        is_active: true,
      })
      .select("id, email, name, user_type")
      .single()

    if (userError) {
      console.error("❌ Erro ao criar usuário:", userError)
      return {
        success: false,
        error: `Erro ao criar usuário: ${userError.message}`,
      }
    }

    console.log("✅ Usuário criado:", newUser.id)

    // Create address
    console.log("🏠 Criando endereço...")
    const { error: addressError } = await supabaseAdmin.from("addresses").insert({
      user_id: newUser.id,
      street: userData.address.street,
      number: userData.address.number,
      complement: userData.address.complement,
      neighborhood: userData.address.neighborhood,
      city: userData.address.city,
      state: userData.address.state,
      cep: userData.address.cep,
      is_primary: true,
    })

    if (addressError) {
      console.error("❌ Erro ao criar endereço:", addressError)
      // Don't fail the entire operation for address error
    } else {
      console.log("✅ Endereço criado")
    }

    // If provider, create provider profile
    if (userData.userType === "provider") {
      console.log("🔧 Criando perfil de prestador...")

      const { data: provider, error: providerError } = await supabaseAdmin
        .from("providers")
        .insert({
          user_id: newUser.id,
          bio: userData.bio || "",
          experience_years: userData.experienceYears || 0,
          is_premium: userData.isPremium || false,
          rating: 0.0,
          total_reviews: 0,
          is_verified: false,
        })
        .select("id")
        .single()

      if (providerError) {
        console.error("❌ Erro ao criar perfil de prestador:", providerError)
        return {
          success: false,
          error: `Erro ao criar perfil de prestador: ${providerError.message}`,
        }
      }

      console.log("✅ Perfil de prestador criado:", provider.id)

      // Add specialties if provided
      if (userData.specialties && userData.specialties.length > 0) {
        console.log("🎯 Adicionando especialidades...")

        // Get specialty IDs
        const { data: specialties, error: specialtiesError } = await supabaseAdmin
          .from("specialties")
          .select("id, name")
          .in("name", userData.specialties)

        if (specialtiesError) {
          console.error("❌ Erro ao buscar especialidades:", specialtiesError)
        } else if (specialties && specialties.length > 0) {
          // Insert provider specialties
          const providerSpecialties = specialties.map((specialty) => ({
            provider_id: provider.id,
            specialty_id: specialty.id,
          }))

          const { error: providerSpecialtiesError } = await supabaseAdmin
            .from("provider_specialties")
            .insert(providerSpecialties)

          if (providerSpecialtiesError) {
            console.error("❌ Erro ao adicionar especialidades:", providerSpecialtiesError)
          } else {
            console.log("✅ Especialidades adicionadas:", specialties.length)
          }
        }
      }
    }

    console.log("🎉 Usuário criado com sucesso!")
    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        userType: newUser.user_type,
      },
    }
  } catch (error) {
    console.error("💥 Exceção na criação de usuário:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    console.log("🔐 Tentando login:", email)

    // Get user by email
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("id, email, password_hash, name, user_type, is_active")
      .eq("email", email)
      .single()

    if (userError || !user) {
      console.log("❌ Usuário não encontrado:", email)
      return {
        success: false,
        error: "Email ou senha incorretos",
      }
    }

    if (!user.is_active) {
      console.log("⚠️ Usuário inativo:", email)
      return {
        success: false,
        error: "Conta desativada",
      }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      console.log("❌ Senha incorreta para:", email)
      return {
        success: false,
        error: "Email ou senha incorretos",
      }
    }

    console.log("✅ Login realizado com sucesso:", user.id)
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.user_type,
      },
    }
  } catch (error) {
    console.error("💥 Erro no login:", error)
    return {
      success: false,
      error: "Erro interno do servidor",
    }
  }
}

export async function validateUserCredentials(email: string, password: string): Promise<any | null> {
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

export async function getUserByEmailService(email: string): Promise<any | null> {
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
