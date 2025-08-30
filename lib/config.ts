export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key",
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "your-service-key",
  },
  app: {
    name: "Maridão",
    description: "Plataforma de serviços domésticos",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
}
