import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateFinancialRecordDto {
  @IsString()
  month!: string;

  @IsString()
  clientName!: string;

  @IsInt()
  @Min(0)
  contract!: number;

  @IsInt()
  @Min(0)
  freelancerCost!: number;

  @IsInt()
  @Min(0)
  opCost!: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
