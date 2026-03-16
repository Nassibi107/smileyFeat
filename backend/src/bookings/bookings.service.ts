import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  findAll() {
    return this.prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  findRecent() {
    return this.prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        companyName: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async create(dto: CreateBookingDto) {
    const booking = await this.prisma.booking.create({
      data: dto,
    });

    try {
      await this.notificationsService.sendBookingNotification(dto);
    } catch {
      // Keep booking creation successful even if SMTP fails.
    }

    return booking;
  }
}
