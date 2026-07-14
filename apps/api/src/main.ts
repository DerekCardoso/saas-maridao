import "reflect-metadata"
import { NestFactory } from "@nestjs/core"
import helmet from "helmet"
import pinoHttp from "pino-http"
import * as Sentry from "@sentry/nestjs"
import { AppModule } from "./app.module"
import { HttpExceptionFilter } from "./common/http-exception.filter"
import { requestIdMiddleware } from "./common/request-id.middleware"

async function bootstrap() {
  if (process.env.SENTRY_DSN) {
    const sentryOptions: Parameters<typeof Sentry.init>[0] = {
      dsn: process.env.SENTRY_DSN
    }
    if (process.env.NODE_ENV) sentryOptions.environment = process.env.NODE_ENV
    Sentry.init(sentryOptions)
  }

  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bufferLogs: true
  })

  app.setGlobalPrefix("v1")
  app.enableCors({
    origin: process.env.WEB_URL ?? "http://localhost:5173",
    credentials: true
  })
  app.enableShutdownHooks()
  app.use(helmet())
  app.use(requestIdMiddleware)
  app.use(
    pinoHttp({
      redact: ["req.headers.authorization", "req.headers.cookie"],
      customProps: (request) => ({
        requestId: (request as typeof request & { requestId?: string }).requestId
      })
    })
  )
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(Number(process.env.PORT ?? 3001))
}

void bootstrap()
