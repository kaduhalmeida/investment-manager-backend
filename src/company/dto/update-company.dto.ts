import { IsString, IsOptional, IsUrl, IsInt, IsBoolean, IsArray, IsDate } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  sector?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  stage?: string;

  @IsOptional()
  @IsInt()
  valuation?: number;

  @IsOptional()
  @IsInt()
  unitPrice?: number;

  @IsOptional()
  @IsString()
  risk?: string;

  @IsOptional()
  @IsArray()
  tags?: { id: string; name: string }[];

  @IsOptional()
  @IsArray()
  valuationHistory?: { date: Date, valuation: number }[];

  @IsOptional()
  @IsBoolean()
  debt?: boolean;

  @IsOptional()
  @IsInt()
  debtValue?: number | null;
}
