export const config = {
  supabase: {
    url: process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!,
    jwtSecret: process.env.SUPABASE_SUPABASE_JWT_SECRET!,
  },
  database: {
    url: process.env.SUPABASE_POSTGRES_URL!,
    prismaUrl: process.env.SUPABASE_POSTGRES_PRISMA_URL!,
    nonPoolingUrl: process.env.SUPABASE_POSTGRES_URL_NON_POOLING!,
    user: process.env.SUPABASE_POSTGRES_USER!,
    host: process.env.SUPABASE_POSTGRES_HOST!,
    password: process.env.SUPABASE_POSTGRES_PASSWORD!,
    database: process.env.SUPABASE_POSTGRES_DATABASE!,
  },
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET!,
    url: process.env.NEXTAUTH_URL!,
  },
  apis: {
    googleMaps: process.env.GOOGLE_MAPS_API_KEY,
  },
}
