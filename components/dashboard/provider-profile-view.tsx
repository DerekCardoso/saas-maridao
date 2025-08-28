import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Phone, Mail, Calendar, Star, Wrench } from "lucide-react"

export function ProviderProfileView() {
  // Dados mockados do prestador
  const provider = {
    name: "Carlos Oliveira",
    email: "prestador@exemplo.com",
    phone: "(11) 99999-9999",
    avatar: "/placeholder.svg?height=100&width=100",
    services: ["Elétrica", "Hidráulica", "Montagem de Móveis"],
    location: "São Paulo, SP",
    joinDate: "Janeiro 2024",
    rating: 4.8,
    completedJobs: 42,
    description:
      "Prestador de serviços com mais de 10 anos de experiência em serviços residenciais e comerciais. Especializado em instalações elétricas e hidráulicas.",
    certifications: ["Eletricista Certificado", "NR-10", "Técnico em Eletrônica"],
    availability: {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "08:00 - 14:00",
      sunday: "Indisponível",
    },
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={provider.name} />
              <AvatarFallback className="text-lg">
                {provider.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{provider.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                {provider.rating} • {provider.completedJobs} serviços concluídos
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              {provider.email}
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              {provider.phone}
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              {provider.location}
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Membro desde {provider.joinDate}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Serviços Oferecidos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Serviços Oferecidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {provider.services.map((service) => (
              <Badge key={service} variant="secondary">
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Descrição */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Sobre</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{provider.description}</p>
        </CardContent>
      </Card>

      {/* Certificações */}
      <Card>
        <CardHeader>
          <CardTitle>Certificações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {provider.certifications.map((cert) => (
              <div key={cert} className="flex items-center text-sm">
                <Badge variant="outline" className="mr-2">
                  ✓
                </Badge>
                {cert}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disponibilidade */}
      <Card>
        <CardHeader>
          <CardTitle>Disponibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(provider.availability).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="capitalize font-medium">
                  {day === "monday" && "Segunda"}
                  {day === "tuesday" && "Terça"}
                  {day === "wednesday" && "Quarta"}
                  {day === "thursday" && "Quinta"}
                  {day === "friday" && "Sexta"}
                  {day === "saturday" && "Sábado"}
                  {day === "sunday" && "Domingo"}
                </span>
                <span className={hours === "Indisponível" ? "text-muted-foreground" : ""}>{hours}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
