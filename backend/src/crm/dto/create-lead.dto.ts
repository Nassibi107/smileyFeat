import { IsEmail, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateLeadDto {
  @IsString()
  company!: string;

  @IsInt()
  @Min(0)
  value!: number;

  @IsString()
  rep!: string;

  @IsString()
  source!: string;

  @IsString()
  stage!: string;

  @IsInt()
  @Min(0)
  daysInStage!: number;

  @IsString()
  contact!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
