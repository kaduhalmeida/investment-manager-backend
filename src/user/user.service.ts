import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto'; 

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  
  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  
  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: dto.name,
        role: dto.role,
        address: dto.address
          ? {
              update: {
                street: dto.address.street,
                number: dto.address.number,
                city: dto.address.city,
                country: dto.address.country,
                postalCode: dto.address.postalCode,
              },
            }
          : undefined, 
      },
    });

    return updatedUser;
  }

 
  async deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
