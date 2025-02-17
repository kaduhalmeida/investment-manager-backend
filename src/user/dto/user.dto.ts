import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  profilePicture?: string;  
  name: any;
  role: any;
  address: any;
}

