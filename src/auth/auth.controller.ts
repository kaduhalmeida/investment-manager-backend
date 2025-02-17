import { Body, Controller, Post, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ChangePasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('change-password')  
  @UseGuards(AuthGuard('jwt'))
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Post('signup')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, callback) => {
          const fileName = uuidv4() + '.' + file.originalname.split('.').pop();
          callback(null, fileName);
        },
      }),
    }),
  )

  
  async signup(@Body() dto: AuthDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      dto.profilePicture = file.filename;
    }
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
