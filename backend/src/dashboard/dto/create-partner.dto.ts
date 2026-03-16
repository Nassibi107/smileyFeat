import { IsOptional, IsString } from "class-validator";

export class CreatePartnerDto {
  @IsString()
  name!: string;

  @IsString()
  category!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;
}
