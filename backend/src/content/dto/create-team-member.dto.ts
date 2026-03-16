import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateTeamMemberDto {
  @IsString()
  name!: string;

  @IsString()
  role!: string;

  @IsString()
  specialty!: string;

  @IsString()
  bio!: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
