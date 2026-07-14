import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Estende o objeto User padrão do NextAuth
   */
  interface User {
    id: string
    userType: string
    isPremium: boolean
  }

  /**
   * Estende o objeto Session padrão do NextAuth
   */
  interface Session {
    user: {
      id: string
      userType: string
      isPremium: boolean
    } & DefaultSession["user"]
  }
}
