import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(walletId: string, type: string, amount: number) {
    return this.prisma.transaction.create({
      data: { walletId, type, amount },
    });
  }

  async getTransactions(walletId: string) {
    return this.prisma.transaction.findMany({ where: { walletId } });
  }
}
