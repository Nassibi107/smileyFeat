import { IsArray, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateDeliveryClientDto {
  @IsString()
  name!: string;

  @IsString()
  owner!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  health?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  contract?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  stage?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  services?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  team?: string[];
}
