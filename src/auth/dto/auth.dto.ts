import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  name?: string;  

  @IsOptional()
  profilePicture?: string;
  address: any;
  role: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  newPassword: string;
  userId: any;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  resetToken: string;

  

  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
