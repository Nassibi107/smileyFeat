import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { NotificationsService } from "./notifications.service";
import { TestNotificationDto } from "./dto/test-notification.dto";

@Controller("notifications")
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("test")
  async sendTest(@Body() dto: TestNotificationDto) {
    await this.notificationsService.sendTestNotification(dto);
    return { success: true };
  }
}
