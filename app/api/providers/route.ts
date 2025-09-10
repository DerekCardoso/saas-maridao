import { NextResponse } from "next/server"

// Mock data para demonstração
const mockProviders = [
  {
    id: "provider-1",
    name: "João Silva",
    service: "Encanamento",
    category: "Hidráulica",
    rating: 4.8,
    reviewCount: 127,
    price: "R$ 80-150/hora",
    location: "São Paulo, SP",
    distance: "2.5 km",
    avatar: "/joao-silva-portrait.png",
    verified: true,
    premium: true,
    description: "Especialista em reparos hidráulicos com 10 anos de experiência.",
    services: ["Vazamentos", "Instalação", "Manutenção"],
    availability: "Disponível hoje",
  },
  {
    id: "provider-2",
    name: "Maria Santos",
    service: "Limpeza Residencial",
    category: "Limpeza",
    rating: 4.9,
    reviewCount: 89,
    price: "R$ 60-100/hora",
    location: "São Paulo, SP",
    distance: "1.8 km",
    avatar: "/maria-santos.jpg",
    verified: true,
    premium: false,
    description: "Serviços de limpeza completa para residências e escritórios.",
    services: ["Limpeza Geral", "Organização", "Faxina"],
    availability: "Disponível amanhã",
  },
  {
    id: "provider-3",
    name: "Carlos Oliveira",
    service: "Elétrica",
    category: "Elétrica",
    rating: 4.7,
    reviewCount: 156,
    price: "R$ 100-200/hora",
    location: "São Paulo, SP",
    distance: "3.2 km",
    avatar: "/carlos-oliveira.png",
    verified: true,
    premium: true,
    description: "Eletricista certificado com especialização em instalações residenciais.",
    services: ["Instalação", "Reparo", "Manutenção"],
    availability: "Disponível hoje",
  },
  {
    id: "provider-4",
    name: "Ana Costa",
    service: "Jardinagem",
    category: "Jardinagem",
    rating: 4.6,
    reviewCount: 73,
    price: "R$ 50-120/hora",
    location: "São Paulo, SP",
    distance: "4.1 km",
    avatar: "/ana-costa-portrait.png",
    verified: false,
    premium: false,
    description: "Paisagista com experiência em manutenção e design de jardins.",
    services: ["Poda", "Plantio", "Design"],
    availability: "Disponível na próxima semana",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")

    let filteredProviders = mockProviders

    if (search) {
      filteredProviders = filteredProviders.filter(
        (provider) =>
          provider.name.toLowerCase().includes(search.toLowerCase()) ||
          provider.service.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category && category !== "all") {
      filteredProviders = filteredProviders.filter(
        (provider) => provider.category.toLowerCase() === category.toLowerCase(),
      )
    }

    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 400))

    return NextResponse.json(filteredProviders)
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
