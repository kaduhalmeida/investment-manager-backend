import { IsString } from 'class-validator';

export class CreateCompanyTagDto {
  @IsString()
  companyId: string;

  @IsString()
  tagId: string;
}
