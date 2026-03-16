import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateSiteContentDto {
  @IsOptional()
  @IsString()
  heroTitle?: string;

  @IsOptional()
  @IsString()
  heroSubtitle?: string;

  @IsOptional()
  @IsString()
  aboutTitle?: string;

  @IsOptional()
  @IsString()
  aboutParagraph?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aboutHighlights?: string[];
}
