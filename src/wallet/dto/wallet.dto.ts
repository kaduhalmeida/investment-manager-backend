import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsOptional()
  @IsNumber()
  fundsAdded?: number;

  @IsOptional()
  @IsNumber()
  spentAmount?: number;
}
