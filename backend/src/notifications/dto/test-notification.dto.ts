import { IsEmail, IsOptional, IsString } from "class-validator";

export class TestNotificationDto {
  @IsOptional()
  @IsEmail()
  to?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
