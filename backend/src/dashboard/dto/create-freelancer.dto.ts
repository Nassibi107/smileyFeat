import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateFreelancerDto {
  @IsString()
  name!: string;

  @IsString()
  specialization!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  rate?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  utilization?: number;

  @IsOptional()
  @IsString()
  profile?: string;
}
