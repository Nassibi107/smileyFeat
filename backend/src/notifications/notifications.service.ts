import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

type BookingMailData = {
  companyName: string;
  website?: string;
  industry: string;
  companyStage: string;
  monthlyRevenue: string;
  bottleneck?: string;
  budgetRange?: string;
  email: string;
  phone?: string;
};

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private transporter?: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>("SMTP_HOST");
    const port = Number(this.configService.get<string>("SMTP_PORT") ?? "587");
    const user = this.configService.get<string>("SMTP_USER");
    const pass = this.configService.get<string>("SMTP_PASS");

    if (!host || !user || !pass) {
      this.logger.warn("SMTP env vars not fully configured. Email notifications are disabled.");
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: String(this.configService.get<string>("SMTP_SECURE") ?? "false") === "true",
      auth: { user, pass },
    });
  }

  async sendBookingNotification(data: BookingMailData) {
    if (!this.transporter) {
      return;
    }

    const to = this.configService.get<string>("MAIL_TO") ?? "my.yassinenassibi@gmail.com";
    const from = this.configService.get<string>("SMTP_FROM") ?? this.configService.get<string>("SMTP_USER")!;

    const lines = [
      `New booking submitted in SMILEY OS`,
      ``,
      `Company: ${data.companyName}`,
      `Website: ${data.website ?? "N/A"}`,
      `Industry: ${data.industry}`,
      `Company Stage: ${data.companyStage}`,
      `Monthly Revenue: ${data.monthlyRevenue}`,
      `Bottleneck: ${data.bottleneck ?? "N/A"}`,
      `Budget Range: ${data.budgetRange ?? "N/A"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone ?? "N/A"}`,
    ];

    await this.transporter.sendMail({
      from,
      to,
      subject: `New Booking: ${data.companyName}`,
      text: lines.join("\n"),
    });
  }
}
