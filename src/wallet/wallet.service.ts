import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}


  async findWalletsByUserId(userId: string) {
    return this.prisma.wallet.findMany({
      where: { userId },
      include: {
        transactions: true,
        investments: true,
      },
    });
  }

  
  async findWalletById(walletId: string) {
    return this.prisma.wallet.findUnique({
      where: { id: walletId },
      include: {
        transactions: true,
        investments: true,
      },
    });
  }

 
  async createWallet(userId: string, createWalletDto: CreateWalletDto) {
    const wallet = await this.prisma.wallet.create({
      data: {
        name: createWalletDto.name,
        userId,
        balance: createWalletDto.balance, 
      },
    });
    return wallet;
  }

 
async updateWallet(walletId: string, updateWalletDto: CreateWalletDto, id: any) {
  const wallet = await this.findWalletById(walletId);
  if (!wallet) throw new NotFoundException('Carteira não encontrada');

  const updatedData: any = {};
  if (updateWalletDto.name) updatedData.name = updateWalletDto.name;
  if (updateWalletDto.balance) updatedData.balance = updateWalletDto.balance;

  return this.prisma.wallet.update({
    where: { id: wallet.id },
    data: updatedData,
  });
}



  async deleteWallet(walletId: string) {
    const wallet = await this.findWalletById(walletId);
    if (!wallet) throw new NotFoundException('Carteira não encontrada');

    return this.prisma.wallet.delete({
      where: { id: walletId },
    });
  }

  async addFunds(walletId: string, amount: number) {
    if (amount <= 0) throw new BadRequestException('O valor deve ser positivo');

    const wallet = await this.findWalletById(walletId);
    if (!wallet) throw new NotFoundException('Carteira não encontrada');

   
    return this.prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: { increment: amount },
        transactions: {
          create: {
            amount,
            type: 'DEPOSIT',
          },
        },
      },
    });
  }

 
  async getWalletStats(walletId: string) {
    const wallet = await this.findWalletById(walletId);
    if (!wallet) throw new NotFoundException('Carteira não encontrada');

    const totalInvested = wallet.investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const totalDeposited = wallet.transactions
      .filter(tx => tx.type === 'DEPOSIT')
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
    const totalWithdrawn = wallet.transactions
      .filter(tx => tx.type === 'WITHDRAW')
      .reduce((sum, tx) => sum + Number(tx.amount), 0);

    const fundsAdded = totalDeposited;
    const spentAmount = totalInvested;

    return {
      balance: wallet.balance,
      fundsAdded, 
      spentAmount, 
      totalDeposited,
      totalWithdrawn,
    };
  }
}


