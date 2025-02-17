import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateInvestmentDto } from './dto/investment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('wallets/:walletId/investments')
export class InvestmentController {
  constructor(private investmentService: InvestmentService) {}

  @Post()
  create(@Req() req, @Param('walletId') walletId: string, @Body() dto: CreateInvestmentDto) {
    return this.investmentService.create(walletId, dto, req.user.id);
  }

  @Patch(':id/sell')
  sellInvestment(@Req() req, @Param('id') id: string, @Body() sellData: { sellPrice: number }) {
    return this.investmentService.sellInvestment(id, req.user.id, sellData);
  }
  

  @Patch(':id/withdraw')
  withdrawInvestment(@Req() req, @Param('id') id: string) {
    return this.investmentService.withdrawInvestment(id, req.user.id);
  }
}
