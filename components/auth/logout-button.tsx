"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { LogOut } from "lucide-react"

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function LogoutButton({ showIcon = true, variant = "ghost", className, ...props }: LogoutButtonProps) {
  const { logout } = useAuth()

  return (
    <Button onClick={logout} variant={variant} className={className} {...props}>
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      Sair
    </Button>
  )
}
