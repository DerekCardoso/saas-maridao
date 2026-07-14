import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import type { Role } from "@maridao/shared"
import { ROLES_KEY } from "./roles.decorator"
import type { AuthUser } from "./auth-user"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!roles?.length) return true

    const user = context.switchToHttp().getRequest<{ user: AuthUser }>().user
    if (!user || !roles.includes(user.role)) throw new ForbiddenException()
    return true
  }
}
