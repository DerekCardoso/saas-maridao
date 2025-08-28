// Dados mockados para substituir as consultas ao banco de dados

// Usuários
export const users = [
  {
    id: "user-1",
    name: "Administrador",
    email: "admin@maridao.com",
    password: "$2a$10$GQT6NmT6.GbHQve1lxKmPeEFGfTH9hSLcO1ggCjkCEQJMjRXkJJHu", // admin123
    phone: "(11) 99999-9999",
    isAdmin: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "user-2",
    name: "Maria Silva",
    email: "maria@example.com",
    password: "$2a$10$GQT6NmT6.GbHQve1lxKmPeEFGfTH9hSLcO1ggCjkCEQJMjRXkJJHu", // cliente123
    phone: "(11) 98765-4321",
    isAdmin: false,
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "user-3",
    name: "João Oliveira",
    email: "joao@example.com",
    password: "$2a$10$GQT6NmT6.GbHQve1lxKmPeEFGfTH9hSLcO1ggCjkCEQJMjRXkJJHu", // cliente123
    phone: "(11) 91234-5678",
    isAdmin: false,
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    id: "user-4",
    name: "Ana Costa",
    email: "ana@example.com",
    password: "$2a$10$GQT6NmT6.GbHQve1lxKmPeEFGfTH9hSLcO1ggCjkCEQJMjRXkJJHu", // cliente123
    phone: "(11) 99876-5432",
    isAdmin: false,
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
  {
    id: "user-5",
    name: "Carlos Pereira",
    email: "carlos@example.com",
    password: "$2a$10$GQT6NmT6.GbHQve1lxKmPeEFGfTH9hSLcO1ggCjkCEQJMjRXkJJHu", // prestador123
    phone: "(11) 97777-8888",
    isAdmin: false,
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: "user-6",
    name: "Fernanda Santos",
    email: "fernanda@example.com",
    password: "$2a$10$GQT6NmT6.GbHQve1lxKmPeEFGfTH9hSLcO1ggCjkCEQJMjRXkJJHu", // prestador123
    phone: "(11) 96666-7777",
    isAdmin: false,
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
  },
  {
    id: "user-7",
    name: "Roberto Almeida",
    email: "roberto@example.com",
    password: "$2a$10$GQT6NmT6.GbHQve1lxKmPeEFGfTH9hSLcO1ggCjkCEQJMjRXkJJHu", // prestador123
    phone: "(11) 95555-6666",
    isAdmin: false,
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
  },
]

// Clientes
export const clients = [
  {
    id: "client-1",
    userId: "user-2",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "client-2",
    userId: "user-3",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    id: "client-3",
    userId: "user-4",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
]

// Prestadores
export const providers = [
  {
    id: "provider-1",
    userId: "user-5",
    bio: "Eletricista com mais de 10 anos de experiência em instalações residenciais e comerciais.",
    isPremium: true,
    premiumExpiresAt: new Date("2023-12-31"),
    rating: 4.5,
    averageResponseTime: "Em média 30 minutos",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
    _count: { reviews: 12 },
  },
  {
    id: "provider-2",
    userId: "user-6",
    bio: "Diarista profissional com experiência em limpeza residencial e comercial.",
    isPremium: false,
    premiumExpiresAt: null,
    rating: 4.2,
    averageResponseTime: "Em média 1 hora",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
    _count: { reviews: 8 },
  },
  {
    id: "provider-3",
    userId: "user-7",
    bio: "Encanador especializado em reparos e instalações hidráulicas.",
    isPremium: true,
    premiumExpiresAt: new Date("2023-12-15"),
    rating: 4.8,
    averageResponseTime: "Em média 45 minutos",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
    _count: { reviews: 15 },
  },
]

// Endereços
export const addresses = [
  {
    id: "address-1",
    userId: "user-2",
    cep: "01310-200",
    street: "Avenida Paulista",
    number: "1000",
    complement: "Apto 123",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "address-2",
    userId: "user-3",
    cep: "04538-132",
    street: "Rua Joaquim Floriano",
    number: "500",
    complement: "Sala 1010",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    id: "address-3",
    userId: "user-4",
    cep: "05424-150",
    street: "Rua dos Pinheiros",
    number: "300",
    complement: null,
    neighborhood: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
  {
    id: "address-4",
    userId: "user-5",
    cep: "04511-011",
    street: "Rua Funchal",
    number: "200",
    complement: "Conj. 52",
    neighborhood: "Vila Olímpia",
    city: "São Paulo",
    state: "SP",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: "address-5",
    userId: "user-6",
    cep: "05303-000",
    street: "Avenida Corifeu de Azevedo Marques",
    number: "1000",
    complement: null,
    neighborhood: "Butantã",
    city: "São Paulo",
    state: "SP",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
  },
  {
    id: "address-6",
    userId: "user-7",
    cep: "02012-021",
    street: "Avenida Cruzeiro do Sul",
    number: "500",
    complement: "Bloco B, Apto 45",
    neighborhood: "Santana",
    city: "São Paulo",
    state: "SP",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
  },
]

// Especialidades dos prestadores
export const providerSpecialties = [
  {
    id: "specialty-1",
    providerId: "provider-1",
    name: "Eletricista",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: "specialty-2",
    providerId: "provider-1",
    name: "Instalação de Ar Condicionado",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: "specialty-3",
    providerId: "provider-2",
    name: "Diarista",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
  },
  {
    id: "specialty-4",
    providerId: "provider-2",
    name: "Limpeza Residencial",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
  },
  {
    id: "specialty-5",
    providerId: "provider-3",
    name: "Encanador",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
  },
  {
    id: "specialty-6",
    providerId: "provider-3",
    name: "Reparos Hidráulicos",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
  },
]

// Agendamentos
export const appointments = [
  {
    id: "appointment-1",
    clientId: "client-1",
    providerId: "provider-1",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dias no futuro
    service: "Instalação Elétrica",
    details: "Instalação de tomadas e interruptores",
    status: "pending",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    client: {
      id: "client-1",
      userId: "user-2",
      user: {
        name: "Maria Silva",
        phone: "(11) 98765-4321",
      },
    },
    provider: {
      id: "provider-1",
      userId: "user-5",
      user: {
        name: "Carlos Pereira",
        phone: "(11) 97777-8888",
      },
    },
    review: null,
  },
  {
    id: "appointment-2",
    clientId: "client-2",
    providerId: "provider-2",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias no futuro
    service: "Limpeza Residencial",
    details: "Limpeza completa de apartamento de 70m²",
    status: "confirmed",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    client: {
      id: "client-2",
      userId: "user-3",
      user: {
        name: "João Oliveira",
        phone: "(11) 91234-5678",
      },
    },
    provider: {
      id: "provider-2",
      userId: "user-6",
      user: {
        name: "Fernanda Santos",
        phone: "(11) 96666-7777",
      },
    },
    review: null,
  },
  {
    id: "appointment-3",
    clientId: "client-3",
    providerId: "provider-3",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias no passado
    service: "Reparo de Vazamento",
    details: "Vazamento na pia da cozinha",
    status: "completed",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    client: {
      id: "client-3",
      userId: "user-4",
      user: {
        name: "Ana Costa",
        phone: "(11) 99876-5432",
      },
    },
    provider: {
      id: "provider-3",
      userId: "user-7",
      user: {
        name: "Roberto Almeida",
        phone: "(11) 95555-6666",
      },
    },
    review: {
      id: "review-1",
      rating: 4.5,
      comment: "Serviço rápido e eficiente. Resolveu o problema do vazamento.",
    },
  },
  {
    id: "appointment-4",
    clientId: "client-1",
    providerId: "provider-2",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 dias no passado
    service: "Limpeza de Escritório",
    details: "Limpeza de escritório de 50m²",
    status: "completed",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    client: {
      id: "client-1",
      userId: "user-2",
      user: {
        name: "Maria Silva",
        phone: "(11) 98765-4321",
      },
    },
    provider: {
      id: "provider-2",
      userId: "user-6",
      user: {
        name: "Fernanda Santos",
        phone: "(11) 96666-7777",
      },
    },
    review: {
      id: "review-2",
      rating: 5.0,
      comment: "Excelente trabalho! O escritório ficou impecável.",
    },
  },
  {
    id: "appointment-5",
    clientId: "client-2",
    providerId: "provider-1",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 dias no passado
    service: "Instalação de Ventilador de Teto",
    details: "Instalação de 3 ventiladores de teto",
    status: "completed",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    client: {
      id: "client-2",
      userId: "user-3",
      user: {
        name: "João Oliveira",
        phone: "(11) 91234-5678",
      },
    },
    provider: {
      id: "provider-1",
      userId: "user-5",
      user: {
        name: "Carlos Pereira",
        phone: "(11) 97777-8888",
      },
    },
    review: {
      id: "review-3",
      rating: 4.0,
      comment: "Bom serviço, mas demorou um pouco mais do que o esperado.",
    },
  },
  {
    id: "appointment-6",
    clientId: "client-3",
    providerId: "provider-1",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 dias no passado
    service: "Troca de Disjuntores",
    details: "Troca de 5 disjuntores no quadro elétrico",
    status: "cancelled",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    client: {
      id: "client-3",
      userId: "user-4",
      user: {
        name: "Ana Costa",
        phone: "(11) 99876-5432",
      },
    },
    provider: {
      id: "provider-1",
      userId: "user-5",
      user: {
        name: "Carlos Pereira",
        phone: "(11) 97777-8888",
      },
    },
    review: null,
  },
]

// Avaliações
export const reviews = [
  {
    id: "review-1",
    appointmentId: "appointment-3",
    clientId: "client-3",
    providerId: "provider-3",
    rating: 4.5,
    comment: "Serviço rápido e eficiente. Resolveu o problema do vazamento.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    client: {
      id: "client-3",
      user: {
        name: "Ana Costa",
      },
    },
    appointment: {
      service: "Reparo de Vazamento",
    },
  },
  {
    id: "review-2",
    appointmentId: "appointment-4",
    clientId: "client-1",
    providerId: "provider-2",
    rating: 5.0,
    comment: "Excelente trabalho! O escritório ficou impecável.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    client: {
      id: "client-1",
      user: {
        name: "Maria Silva",
      },
    },
    appointment: {
      service: "Limpeza de Escritório",
    },
  },
  {
    id: "review-3",
    appointmentId: "appointment-5",
    clientId: "client-2",
    providerId: "provider-1",
    rating: 4.0,
    comment: "Bom serviço, mas demorou um pouco mais do que o esperado.",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    client: {
      id: "client-2",
      user: {
        name: "João Oliveira",
      },
    },
    appointment: {
      service: "Instalação de Ventilador de Teto",
    },
  },
]

// Mensagens
export const messages = [
  {
    id: "message-1",
    senderId: "user-2",
    receiverId: "user-5",
    content: "Olá, gostaria de saber se você tem disponibilidade para instalar algumas tomadas na próxima semana.",
    isRead: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    sender: {
      id: "user-2",
      name: "Maria Silva",
    },
    receiver: {
      id: "user-5",
      name: "Carlos Pereira",
    },
  },
  {
    id: "message-2",
    senderId: "user-5",
    receiverId: "user-2",
    content: "Olá Maria, sim, tenho disponibilidade. Podemos agendar para terça ou quinta-feira.",
    isRead: true,
    createdAt: new Date(Date.now() - 4.9 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4.9 * 24 * 60 * 60 * 1000),
    sender: {
      id: "user-5",
      name: "Carlos Pereira",
    },
    receiver: {
      id: "user-2",
      name: "Maria Silva",
    },
  },
  {
    id: "message-3",
    senderId: "user-2",
    receiverId: "user-5",
    content: "Ótimo! Vamos agendar para terça-feira então. Que horas você poderia vir?",
    isRead: true,
    createdAt: new Date(Date.now() - 4.8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4.8 * 24 * 60 * 60 * 1000),
    sender: {
      id: "user-2",
      name: "Maria Silva",
    },
    receiver: {
      id: "user-5",
      name: "Carlos Pereira",
    },
  },
  {
    id: "message-4",
    senderId: "user-5",
    receiverId: "user-2",
    content: "Posso ir pela manhã, por volta das 9h. Seria bom para você?",
    isRead: true,
    createdAt: new Date(Date.now() - 4.7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4.7 * 24 * 60 * 60 * 1000),
    sender: {
      id: "user-5",
      name: "Carlos Pereira",
    },
    receiver: {
      id: "user-2",
      name: "Maria Silva",
    },
  },
  {
    id: "message-5",
    senderId: "user-2",
    receiverId: "user-5",
    content: "Perfeito! Aguardo você na terça às 9h. Meu endereço é Av. Paulista, 1000, apto 123.",
    isRead: true,
    createdAt: new Date(Date.now() - 4.6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4.6 * 24 * 60 * 60 * 1000),
    sender: {
      id: "user-2",
      name: "Maria Silva",
    },
    receiver: {
      id: "user-5",
      name: "Carlos Pereira",
    },
  },
  {
    id: "message-6",
    senderId: "user-3",
    receiverId: "user-6",
    content: "Boa tarde, preciso de uma limpeza no meu apartamento. Você tem disponibilidade esta semana?",
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    sender: {
      id: "user-3",
      name: "João Oliveira",
    },
    receiver: {
      id: "user-6",
      name: "Fernanda Santos",
    },
  },
  {
    id: "message-7",
    senderId: "user-6",
    receiverId: "user-3",
    content: "Olá João, tenho disponibilidade para sexta-feira. Seria um bom dia para você?",
    isRead: false,
    createdAt: new Date(Date.now() - 5.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5.5 * 24 * 60 * 60 * 1000),
    sender: {
      id: "user-6",
      name: "Fernanda Santos",
    },
    receiver: {
      id: "user-3",
      name: "João Oliveira",
    },
  },
]

// Notificações
export const notifications = [
  {
    id: "notification-1",
    userId: "user-5",
    type: "appointment",
    title: "Novo Agendamento",
    content:
      "Maria Silva agendou um serviço de Instalação Elétrica para o dia " +
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    isRead: false,
    linkUrl: "/dashboard/provider/appointments",
    relatedId: "appointment-1",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "notification-2",
    userId: "user-6",
    type: "appointment",
    title: "Novo Agendamento",
    content:
      "João Oliveira agendou um serviço de Limpeza Residencial para o dia " +
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    isRead: true,
    linkUrl: "/dashboard/provider/appointments",
    relatedId: "appointment-2",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "notification-3",
    userId: "user-2",
    type: "message",
    title: "Nova Mensagem",
    content: "Carlos Pereira enviou uma mensagem para você.",
    isRead: false,
    linkUrl: "/dashboard/client/messages",
    relatedId: "message-2",
    createdAt: new Date(Date.now() - 4.9 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4.9 * 24 * 60 * 60 * 1000),
  },
  {
    id: "notification-4",
    userId: "user-5",
    type: "message",
    title: "Nova Mensagem",
    content: "Maria Silva enviou uma mensagem para você.",
    isRead: true,
    linkUrl: "/dashboard/provider/messages",
    relatedId: "message-3",
    createdAt: new Date(Date.now() - 4.8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4.8 * 24 * 60 * 60 * 1000),
  },
  {
    id: "notification-5",
    userId: "user-3",
    type: "message",
    title: "Nova Mensagem",
    content: "Fernanda Santos enviou uma mensagem para você.",
    isRead: false,
    linkUrl: "/dashboard/client/messages",
    relatedId: "message-7",
    createdAt: new Date(Date.now() - 5.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5.5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "notification-6",
    userId: "user-7",
    type: "review",
    title: "Nova Avaliação",
    content: "Ana Costa avaliou seu serviço de Reparo de Vazamento com 4.5 estrelas.",
    isRead: false,
    linkUrl: "/dashboard/provider/reviews",
    relatedId: "review-1",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "notification-7",
    userId: "user-6",
    type: "review",
    title: "Nova Avaliação",
    content: "Maria Silva avaliou seu serviço de Limpeza de Escritório com 5.0 estrelas.",
    isRead: true,
    linkUrl: "/dashboard/provider/reviews",
    relatedId: "review-2",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
]
