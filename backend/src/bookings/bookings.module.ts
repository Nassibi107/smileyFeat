import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BookingsController } from "./bookings.controller";
import { BookingsService } from "./bookings.service";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [NotificationsModule, AuthModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
