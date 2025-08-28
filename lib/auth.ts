import bcrypt from "bcryptjs"
import { supabase } from "./supabase"

export interface AuthUser {
  id: string
  email: string
  name: string
  userType: "client" | "provider" | "admin"
  isAdmin: boolean
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    // Buscar usuário no banco
    const { data: user, error } = await supabase.from("users").select("*").eq("email", email.toLowerCase()).single()

    if (error || !user) {
      console.error("Usuário não encontrado:", error)
      return null
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      console.error("Senha inválida")
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.user_type as "client" | "provider" | "admin",
      isAdmin: user.is_admin,
    }
  } catch (error) {
    console.error("Erro na autenticação:", error)
    return null
  }
}

export async function createUser(userData: {
  email: string
  name: string
  phone?: string
  userType: "client" | "provider"
  password: string
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
}): Promise<AuthUser | null> {
  try {
    console.log("🚀 Iniciando criação de usuário:", { email: userData.email, userType: userData.userType })

    // Verificar se o email já existe
    console.log("🔍 Verificando se email já existe...")
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("email")
      .eq("email", userData.email.toLowerCase())
      .maybeSingle()

    if (checkError) {
      console.error("❌ Erro ao verificar email existente:", checkError)
      throw new Error(`Erro ao verificar email: ${checkError.message}`)
    }

    if (existingUser) {
      console.error("❌ Email já existe:", userData.email)
      throw new Error("Este email já está cadastrado. Tente fazer login ou use outro email.")
    }

    // Hash da senha
    console.log("🔐 Gerando hash da senha...")
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    console.log("✅ Senha hasheada com sucesso")

    // Criar usuário
    console.log("👤 Criando usuário no banco...")
    const { data: user, error: userError } = await supabase
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
      throw new Error(`Erro ao criar usuário: ${userError.message}`)
    }

    if (!user) {
      console.error("❌ Usuário não foi criado - dados vazios")
      throw new Error("Usuário não foi criado - resposta vazia do banco")
    }

    console.log("✅ Usuário criado com sucesso:", user.id)

    // Criar endereço se fornecido
    if (userData.address) {
      console.log("🏠 Criando endereço...")
      const { error: addressError } = await supabase.from("addresses").insert({
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
        // Não falhar por causa do endereço, apenas logar o erro
      } else {
        console.log("✅ Endereço criado com sucesso")
      }
    }

    // Criar registro específico do tipo de usuário
    if (userData.userType === "client") {
      console.log("👥 Criando registro de cliente...")
      const { error: clientError } = await supabase.from("clients").insert({
        user_id: user.id,
      })

      if (clientError) {
        console.error("❌ Erro ao criar cliente:", clientError)
        throw new Error(`Erro ao criar cliente: ${clientError.message}`)
      }
      console.log("✅ Cliente criado com sucesso")
    } else if (userData.userType === "provider") {
      console.log("🔧 Criando registro de prestador...")
      const { data: provider, error: providerError } = await supabase
        .from("providers")
        .insert({
          user_id: user.id,
          bio: userData.providerData?.bio || null,
          experience_years: userData.providerData?.experienceYears || null,
          is_premium: userData.providerData?.isPremium || false,
          is_available: true,
          rating: 0,
          total_services: 0,
          category_ids: [],
        })
        .select()
        .single()

      if (providerError) {
        console.error("❌ Erro ao criar prestador:", providerError)
        throw new Error(`Erro ao criar prestador: ${providerError.message}`)
      }

      console.log("✅ Prestador criado com sucesso:", provider.id)

      // Criar especialidades se fornecidas
      if (provider && userData.providerData?.specialties && userData.providerData.specialties.length > 0) {
        console.log("🎯 Criando especialidades...")
        const specialties = userData.providerData.specialties.map((specialty) => ({
          provider_id: provider.id,
          name: specialty,
        }))

        const { error: specialtiesError } = await supabase.from("provider_specialties").insert(specialties)

        if (specialtiesError) {
          console.error("⚠️ Erro ao criar especialidades (não crítico):", specialtiesError)
          // Não falhar por causa das especialidades, apenas logar o erro
        } else {
          console.log("✅ Especialidades criadas com sucesso")
        }
      }
    }

    console.log("🎉 Usuário criado completamente com sucesso!")

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.user_type as "client" | "provider" | "admin",
      isAdmin: user.is_admin,
    }
  } catch (error) {
    console.error("💥 Erro detalhado ao criar usuário:", error)

    // Se o erro for um objeto Error, relançar com a mensagem
    if (error instanceof Error) {
      throw error
    }

    // Se for outro tipo de erro, criar um Error com mensagem genérica
    throw new Error("Erro inesperado ao criar usuário. Tente novamente.")
  }
}
