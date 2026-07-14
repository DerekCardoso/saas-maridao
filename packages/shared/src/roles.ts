export const roles = ["client", "provider", "admin", "super_admin"] as const
export type Role = (typeof roles)[number]

export const isAdminRole = (role: Role) => role === "admin" || role === "super_admin"
