import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  createTransaction(@Body() body: { walletId: string; type: string; amount: number }) {
    return this.transactionService.createTransaction(body.walletId, body.type, body.amount);
  }

  @Get(':walletId')
  getTransactions(@Param('walletId') walletId: string) {
    return this.transactionService.getTransactions(walletId);
  }
}
