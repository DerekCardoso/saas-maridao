import { HttpException, type HttpStatus } from "@nestjs/common"
import type { ErrorCode } from "@maridao/shared"

export class ApiException extends HttpException {
  constructor(
    readonly code: ErrorCode,
    message: string,
    status: HttpStatus,
    readonly details: Record<string, unknown> = {}
  ) {
    super(message, status)
  }
}
