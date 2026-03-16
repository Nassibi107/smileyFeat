import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
  @IsString()
  companyName!: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsString()
  industry!: string;

  @IsString()
  companyStage!: string;

  @IsString()
  monthlyRevenue!: string;

  @IsOptional()
  @IsString()
  bottleneck?: string;

  @IsOptional()
  @IsString()
  budgetRange?: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
