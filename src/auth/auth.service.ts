import { Injectable, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, ChangePasswordDto, ResetPasswordDto } from './dto/auth.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
  
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }
  
    const hashedPassword = await bcrypt.hash(dto.password, 10);
  
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        profilePicture: dto.profilePicture,
        role: dto.role || 'INVESTOR', 
        address: {
          create: {
            street: dto.address?.street,
            number: dto.address?.number,
            city: dto.address?.city,
            country: dto.address?.country,
            postalCode: dto.address?.postalCode,
          },
        },
        wallets: {
          create: {
            name: `Carteira de ${dto.name}`,
            balance: 0.00,
          },
        },
      },
      include: { wallets: true, address: true },
    });
  
    return { access_token: this.generateToken(user.id, user.email), ...user };
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.generateToken(user.id, user.email);
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    await this.prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry: expiry },
    });

    return { message: 'Token de recuperação enviado para o email' };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: changePasswordDto.userId }, 
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const newPasswordHash = await bcrypt.hash(changePasswordDto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: changePasswordDto.userId },
      data: { password: newPasswordHash },
    });

    return { message: 'Senha alterada com sucesso' };
  }

  async resetPassword(dto: ResetPasswordDto) {

    const user = await this.prisma.user.findFirst({ where: { resetToken: dto.resetToken } });
  
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Token inválido ou expirado');
    }
  
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
  
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });
  
    return { message: 'Senha redefinida com sucesso' };
  }

  private generateToken(userId: string, email: string) {
    return { access_token: this.jwtService.sign({ sub: userId, email }) };
  }
}
