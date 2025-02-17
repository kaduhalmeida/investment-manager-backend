import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateWalletDto } from './dto/wallet.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  
  @Post()
  createWallet(@Req() req, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(req.user.id, createWalletDto);
  }


  @Get()
  getWallet(@Req() req) {
    return this.walletService.findWalletsByUserId(req.user.id);
  }

 
  @Post('add-funds')
  addFunds(@Req() req, @Body('amount') amount: number) {
    return this.walletService.addFunds(req.user.id, amount);
  }

  
  @Get('stats')
  getStats(@Req() req) {
    return this.walletService.getWalletStats(req.user.id);
  }


  @Put(':id')
  updateWallet(@Param('id') walletId: string, @Body() updateWalletDto: CreateWalletDto, @Req() req) {
    return this.walletService.updateWallet(walletId, updateWalletDto, req.user.id);
  }
  

  
  @Delete(':id')
  deleteWallet(@Param('id') walletId: string) {
    return this.walletService.deleteWallet(walletId);
  }
}
