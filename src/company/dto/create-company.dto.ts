import { IsString, IsOptional, IsUrl, IsInt, IsBoolean, IsArray, IsDate } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  sector: string;

  @IsUrl()
  website: string;

  @IsString()
  logo: string;

  @IsString()
  stage: string;

  @IsInt()
  valuation: number;

  @IsInt()
  unitPrice: number;

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
