export interface MockUser {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  userType: "client" | "provider" | "admin"
  phone?: string
  address?: {
    cep: string
    street: string
    number?: string
    complement?: string
    neighborhood: string
    city: string
    state: string
  }
  specialty?: string
  isPremium?: boolean
}

export const mockUsers: MockUser[] = [
  {
    id: "client-1",
    firstName: "João",
    lastName: "Silva",
    email: "cliente@exemplo.com",
    password: "senha123",
    userType: "client",
    phone: "(11) 98765-4321",
    address: {
      cep: "01310-200",
      street: "Avenida Paulista",
      number: "1000",
      complement: "Apto 123",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
    },
  },
  {
    id: "provider-1",
    firstName: "Carlos",
    lastName: "Oliveira",
    email: "prestador@exemplo.com",
    password: "senha123",
    userType: "provider",
    phone: "(11) 91234-5678",
    address: {
      cep: "04538-132",
      street: "Rua Joaquim Floriano",
      number: "500",
      neighborhood: "Itaim Bibi",
      city: "São Paulo",
      state: "SP",
    },
    specialty: "eletrica",
    isPremium: true,
  },
  {
    id: "admin-1",
    firstName: "Admin",
    lastName: "Sistema",
    email: "admin@exemplo.com",
    password: "admin123",
    userType: "admin",
  },
]
