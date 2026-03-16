import { Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { compare, hash } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";

type AuthPayload = {
  sub: string;
  role: string;
  email: string;
};

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.ensureAdminUser();
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid login credentials.");
    }

    const passwordValid = await compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException("Invalid login credentials.");
    }

    const token = jwt.sign(
      {
        sub: String(user.id),
        role: user.role,
        email: user.email,
      } satisfies AuthPayload,
      this.getJwtSecret(),
      { expiresIn: "12h" },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.getJwtSecret()) as AuthPayload;
    } catch {
      throw new UnauthorizedException("Invalid or expired token.");
    }
  }

  private getJwtSecret() {
    return this.configService.get<string>("JWT_SECRET") ?? "smileyos-dev-secret";
  }

  private async ensureAdminUser() {
    const adminEmail = this.configService.get<string>("CRM_ADMIN_EMAIL") ?? "admin@smileyos.local";
    const adminPassword = this.configService.get<string>("CRM_ADMIN_PASSWORD") ?? "change-me-now";
    const passwordHash = await hash(adminPassword, 10);

    await this.prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        passwordHash,
        role: "admin",
      },
      create: {
        email: adminEmail,
        passwordHash,
        role: "admin",
      },
    });
  }
}
