import { hash, compare } from "bcrypt"
import prisma from "../db"
import type { Address } from "../viacep"
import { getUserById, getUsers } from "../db"
import type { User } from "../mock-data"

export interface CreateUserParams {
  name: string
  email: string
  password: string
  phone: string
  userType: "client" | "provider"
  address: Address & { number?: string }
  isPremium?: boolean
  specialties?: string[]
  bio?: string
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

export async function createUser(params: CreateUserParams): Promise<UserResponse> {
  const { name, email, password, phone, userType, address, isPremium = false, specialties = [], bio } = params

  // Verifica se o email já está em uso
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error("Email já está em uso")
  }

  // Hash da senha
  const hashedPassword = await hash(password, 10)

  // Cria o usuário
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
    },
  })

  // Cria o endereço
  await prisma.address.create({
    data: {
      userId: user.id,
      cep: address.cep,
      street: address.street,
      number: address.number,
      complement: address.complement,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
    },
  })

  // Cria o perfil específico (cliente ou prestador)
  if (userType === "client") {
    await prisma.client.create({
      data: {
        userId: user.id,
      },
    })
  } else if (userType === "provider") {
    const provider = await prisma.provider.create({
      data: {
        userId: user.id,
        isPremium,
        bio,
      },
    })

    // Adiciona as especialidades do prestador
    if (specialties.length > 0) {
      for (const specialty of specialties) {
        await prisma.providerSpecialty.create({
          data: {
            providerId: provider.id,
            name: specialty,
          },
        })
      }
    }
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    userType,
    address,
    isPremium: userType === "provider" ? isPremium : undefined,
    specialties: userType === "provider" ? specialties : undefined,
    bio: userType === "provider" ? bio : undefined,
  }
}

export async function getUserByEmailService(email: string): Promise<UserResponse | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      client: true,
      provider: {
        include: {
          specialties: true,
        },
      },
      addresses: true,
    },
  })

  if (!user) {
    return null
  }

  let userType: "client" | "provider" | "admin" = "client"
  let isPremium: boolean | undefined
  let specialties: string[] | undefined
  let bio: string | undefined

  if (user.isAdmin) {
    userType = "admin"
  } else if (user.provider) {
    userType = "provider"
    isPremium = user.provider.isPremium
    specialties = user.provider.specialties.map((s) => s.name)
    bio = user.provider.bio || undefined
  } else if (user.client) {
    userType = "client"
  }

  const address = user.addresses[0]
    ? {
        cep: user.addresses[0].cep,
        street: user.addresses[0].street,
        number: user.addresses[0].number || undefined,
        complement: user.addresses[0].complement || undefined,
        neighborhood: user.addresses[0].neighborhood,
        city: user.addresses[0].city,
        state: user.addresses[0].state,
      }
    : undefined

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    userType,
    address,
    isPremium,
    specialties,
    bio,
  }
}

export async function validateUserCredentials(email: string, password: string): Promise<UserResponse | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      client: true,
      provider: {
        include: {
          specialties: true,
        },
      },
    },
  })

  if (!user) {
    return null
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    return null
  }

  let userType: "client" | "provider" | "admin" = "client"
  let isPremium: boolean | undefined
  let specialties: string[] | undefined
  let bio: string | undefined

  if (user.isAdmin) {
    userType = "admin"
  } else if (user.provider) {
    userType = "provider"
    isPremium = user.provider.isPremium
    specialties = user.provider.specialties.map((s) => s.name)
    bio = user.provider.bio || undefined
  } else if (user.client) {
    userType = "client"
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    userType,
    isPremium,
    specialties,
    bio,
  }
}

export async function getUserService(id: string): Promise<User | null> {
  return getUserById(id)
}

export async function getAllUsersService(): Promise<User[]> {
  return getUsers()
}

export async function createUserService(userData: Omit<User, "id">): Promise<User> {
  // Simulando criação de usuário com dados mockados
  const newUser: User = {
    id: `user-${Date.now()}`,
    ...userData,
  }
  return newUser
}

export async function updateUserService(id: string, userData: Partial<User>): Promise<User | null> {
  const user = await getUserById(id)
  if (!user) return null

  // Simulando atualização de usuário com dados mockados
  return {
    ...user,
    ...userData,
  }
}

export async function deleteUserService(id: string): Promise<boolean> {
  // Simulando exclusão de usuário
  return true
}
