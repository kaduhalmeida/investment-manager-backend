import { IsNotEmpty, IsNumber, Min, IsDate, IsString, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvestmentDto {
  @IsUUID()
  walletId: string;
 
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsDate() 
  @Type(() => Date)
  purchaseDate: Date;

  @IsString()
  @IsNotEmpty()
  risk: string;

  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @IsNotEmpty()
  companyId: string;

  @IsNumber()
  profitability: number;
  
  @IsOptional()
  @IsString()
  type?: string; 
}
