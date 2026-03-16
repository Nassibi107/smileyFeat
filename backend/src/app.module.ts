import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { CrmModule } from "./crm/crm.module";
import { BookingsModule } from "./bookings/bookings.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AuthModule } from "./auth/auth.module";
import { ContentModule } from "./content/content.module";
import { DashboardModule } from "./dashboard/dashboard.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    NotificationsModule,
    CrmModule,
    BookingsModule,
    ContentModule,
    DashboardModule,
  ],
})
export class AppModule {}
