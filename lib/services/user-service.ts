import bcrypt from "bcryptjs"
import { getSupabaseAdmin } from "@/lib/supabase"

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
  email: string
  name: string
  phone?: string
  password: string
  userType: "client" | "provider" | "admin"
  address?: {
    street: string
    number?: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    cep: string
  }
  providerData?: {
    bio?: string
    experienceYears?: number
    isPremium?: boolean
    specialties?: string[]
  }
}

export interface LoginData {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  userType: "client" | "provider" | "admin"
  isAdmin: boolean
}

export async function createUser(userData: CreateUserData): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    console.log("🔄 Iniciando criação de usuário:", userData.email)

    const supabase = getSupabaseAdmin()

    // Check if email already exists
    console.log("🔍 Verificando se email já existe...")
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("email")
      .eq("email", userData.email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("❌ Erro ao verificar email existente:", checkError)
      throw new Error(`Erro ao verificar email: ${checkError.message}`)
    }

    if (existingUser) {
      console.log("⚠️ Email já existe")
      return { success: false, error: "Email já está em uso" }
    }

    // Hash password
    console.log("🔐 Gerando hash da senha...")
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // Create user
    console.log("👤 Criando usuário...")
    const { data: newUser, error: userError } = await supabase
      .from("users")
      .insert({
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        user_type: userData.userType,
        is_admin: userData.userType === "admin",
        password: hashedPassword,
      })
      .select()
      .single()

    if (userError) {
      console.error("❌ Erro ao criar usuário:", userError)
      throw new Error(`Erro ao criar usuário: ${userError.message}`)
    }

    console.log("✅ Usuário criado:", newUser.id)

    // Create client or provider record
    if (userData.userType === "client") {
      console.log("👥 Criando registro de cliente...")
      const { error: clientError } = await supabase.from("clients").insert({ user_id: newUser.id })

      if (clientError) {
        console.error("❌ Erro ao criar cliente:", clientError)
        throw new Error(`Erro ao criar cliente: ${clientError.message}`)
      }
    } else if (userData.userType === "provider") {
      console.log("🔧 Criando registro de prestador...")
      const { data: newProvider, error: providerError } = await supabase
        .from("providers")
        .insert({
          user_id: newUser.id,
          bio: userData.providerData?.bio,
          experience_years: userData.providerData?.experienceYears,
          is_premium: userData.providerData?.isPremium || false,
        })
        .select()
        .single()

      if (providerError) {
        console.error("❌ Erro ao criar prestador:", providerError)
        throw new Error(`Erro ao criar prestador: ${providerError.message}`)
      }

      // Add specialties if provided
      if (userData.providerData?.specialties && userData.providerData.specialties.length > 0) {
        console.log("🎯 Adicionando especialidades...")
        const specialties = userData.providerData.specialties.map((name) => ({
          provider_id: newProvider.id,
          name,
        }))

        const { error: specialtiesError } = await supabase.from("provider_specialties").insert(specialties)

        if (specialtiesError) {
          console.error("❌ Erro ao criar especialidades:", specialtiesError)
          // Don't throw here, specialties are optional
        }
      }
    }

    // Add address if provided
    if (userData.address) {
      console.log("🏠 Adicionando endereço...")
      const { error: addressError } = await supabase.from("addresses").insert({
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
        // Don't throw here, address is optional
      }
    }

    console.log("🎉 Usuário criado com sucesso!")

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        userType: newUser.user_type as "client" | "provider" | "admin",
        isAdmin: newUser.is_admin,
      },
    }
  } catch (error) {
    console.error("💥 Erro na criação do usuário:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

export async function loginUser(loginData: LoginData): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    console.log("🔄 Iniciando login:", loginData.email)

    const supabase = getSupabaseAdmin()

    // Find user by email
    console.log("🔍 Buscando usuário...")
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", loginData.email)
      .single()

    if (userError || !user) {
      console.log("❌ Usuário não encontrado")
      return { success: false, error: "Email ou senha incorretos" }
    }

    // Verify password
    console.log("🔐 Verificando senha...")
    const isValidPassword = await bcrypt.compare(loginData.password, user.password)

    if (!isValidPassword) {
      console.log("❌ Senha incorreta")
      return { success: false, error: "Email ou senha incorretos" }
    }

    console.log("✅ Login realizado com sucesso!")

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        userType: user.user_type as "client" | "provider" | "admin",
        isAdmin: user.is_admin,
      },
    }
  } catch (error) {
    console.error("💥 Erro no login:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

export async function validateUserCredentials(email: string, password: string): Promise<any | null> {
  try {
    console.log("🔍 Validando credenciais para:", email)

    const supabase = getSupabaseAdmin()

    // Find user by email
    console.log("🔍 Buscando usuário...")
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .single()

    if (userError || !user) {
      console.log("❌ Usuário não encontrado")
      return null
    }

    // Verify password
    console.log("🔐 Verificando senha...")
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      console.log("❌ Senha inválida para:", email)
      return null
    }

    console.log("✅ Credenciais válidas para:", email)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      userType: user.user_type as "client" | "provider" | "admin",
      isAdmin: user.is_admin,
    }
  } catch (error) {
    console.error("💥 Erro ao validar credenciais:", error)
    return null
  }
}

export async function getUserByEmailService(email: string): Promise<any | null> {
  try {
    const supabase = getSupabaseAdmin()

    const { data: user, error } = await supabase.from("users").select("*").eq("email", email.toLowerCase()).single()

    if (error || !user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      userType: user.user_type as "client" | "provider" | "admin",
      isAdmin: user.is_admin,
    }
  } catch (error) {
    console.error("💥 Erro ao buscar usuário:", error)
    return null
  }
}

export async function getAllUsersService() {
  try {
    const supabase = getSupabaseAdmin()

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
    const supabase = getSupabaseAdmin()

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
    const supabase = getSupabaseAdmin()

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
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from("users").delete().eq("id", id)

    if (error) throw error
    return true
  } catch (error) {
    console.error("💥 Erro ao deletar usuário:", error)
    return false
  }
}
