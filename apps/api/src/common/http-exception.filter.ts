import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  type ExceptionFilter
} from "@nestjs/common"
import type { Request, Response } from "express"
import { errorCodes, type ApiErrorResponse } from "@maridao/shared"
import { ApiException } from "./api-exception"

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request & { requestId?: string }>()
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const payload: ApiErrorResponse = {
      code: exception instanceof ApiException ? exception.code : errorCodes.internalError,
      message:
        exception instanceof HttpException && status < 500
          ? exception.message
          : "Ocorreu um erro interno.",
      details: exception instanceof ApiException ? exception.details : {},
      requestId: request.requestId ?? "unknown"
    }

    response.status(status).json(payload)
  }
}
