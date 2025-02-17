import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvestmentDto } from './dto/investment.dto';

@Injectable()
export class InvestmentService {
  constructor(private prisma: PrismaService) {}

  async create(walletId: string, dto: CreateInvestmentDto, userId: string) {
    const wallet = await this.prisma.wallet.findUnique({ where: { id: walletId } });

    if (!wallet) throw new NotFoundException('Carteira não encontrada');
    if (wallet.userId !== userId) throw new ForbiddenException('Acesso negado');

    const existingInvestment = await this.prisma.investment.findFirst({
      where: {
        walletId,
        companyId: dto.companyId,
      },
    });
    if (existingInvestment) {
      throw new BadRequestException('Você já possui um investimento nesta empresa.');
    }

    const investmentData: any = {
      name: dto.name,
      amount: dto.amount,
      unitPrice: dto.unitPrice ?? 0,
      walletId,
      purchaseDate: dto.purchaseDate instanceof Date ? dto.purchaseDate : new Date(dto.purchaseDate),
      risk: dto.risk ?? 'medium',
      profitability: dto.profitability ?? 0,
      companyId: dto.companyId,
    };

    if (dto.type) {
      investmentData.type = dto.type;
    }

    return this.prisma.investment.create({
      data: investmentData,
    });
  }

  async sellInvestment(id: string, userId: string, sellData: { sellPrice: number }) {
    const investment = await this.prisma.investment.findUnique({ where: { id } });
  
    if (!investment) throw new NotFoundException('Investimento não encontrado');
  
    const wallet = await this.prisma.wallet.findUnique({ where: { id: investment.walletId } });
  
    if (!wallet || wallet.userId !== userId) throw new ForbiddenException('Acesso negado');
  
    return this.prisma.investment.update({
      where: { id },
      data: {
        sellPrice: sellData.sellPrice,
        status: 'SOLD', 
      },
    });
  }
  async getInvestments(walletId: string, userId: string) {
    return this.prisma.investment.findMany({
      where: {
        walletId,

      },
    });
  }
  
  async withdrawInvestment(id: string, userId: string) {
    const investment = await this.prisma.investment.findUnique({ where: { id } });
  
    if (!investment) throw new NotFoundException('Investimento não encontrado');
  
    const wallet = await this.prisma.wallet.findUnique({ where: { id: investment.walletId } });
  
    if (!wallet || wallet.userId !== userId) throw new ForbiddenException('Acesso negado');
  
    if (investment.status !== 'SOLD') {
      throw new BadRequestException('O investimento precisa ser vendido antes de retirar fundos.');
    }
  
    if (investment.sellPrice === null) {
      throw new BadRequestException('O investimento não possui um preço de venda definido.');
    }
  
    await this.prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: { increment: investment.sellPrice - investment.amount },
      },
    });
  
    return this.prisma.investment.update({
      where: { id },
      data: { status: 'WITHDRAWN' },  
    });
  }
}
