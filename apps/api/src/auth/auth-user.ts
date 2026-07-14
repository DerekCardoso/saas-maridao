import type { Role } from "@maridao/shared"

export interface AuthUser {
  id: string
  email: string
  role: Role
  isBlocked: boolean
}
