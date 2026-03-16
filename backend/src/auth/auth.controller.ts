import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request & { user?: { sub?: string } }) {
    const userId = Number(req.user?.sub);
    return this.authService.getProfile(userId);
  }

  @Put("profile")
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @Req() req: Request & { user?: { sub?: string } },
    @Body() dto: UpdateProfileDto,
  ) {
    const userId = Number(req.user?.sub);
    return this.authService.updateProfile(userId, dto);
  }
}
