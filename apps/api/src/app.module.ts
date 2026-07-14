import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
import { validateEnv } from "./config/env"
import { DatabaseModule } from "./database/database.module"
import { StorageModule } from "./storage/storage.module"
import { MapboxModule } from "./mapbox/mapbox.module"
import { NotificationsModule } from "./notifications/notifications.module"
import { JwtAuthGuard } from "./auth/jwt-auth.guard"
import { RolesGuard } from "./auth/roles.guard"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { CategoriesModule } from "./categories/categories.module"
import { SearchModule } from "./search/search.module"
import { ProvidersModule } from "./providers/providers.module"
import { AvailabilityModule } from "./availability/availability.module"
import { AppointmentsModule } from "./appointments/appointments.module"
import { ReviewsModule } from "./reviews/reviews.module"
import { BillingModule } from "./billing/billing.module"
import { AdminModule } from "./admin/admin.module"
import { AnalyticsModule } from "./analytics/analytics.module"
import { HealthController } from "./health/health.controller"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    DatabaseModule,
    StorageModule,
    MapboxModule,
    NotificationsModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    SearchModule,
    ProvidersModule,
    AvailabilityModule,
    AppointmentsModule,
    ReviewsModule,
    BillingModule,
    AdminModule,
    AnalyticsModule
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class AppModule {}
