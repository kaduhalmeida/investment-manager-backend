import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller'; 
import { WalletService } from './wallet.service';
import { AuthModule } from '../auth/auth.module'; 
import { PrismaModule } from '../prisma/prisma.module';  

@Module({
  imports: [AuthModule, PrismaModule],  
  controllers: [WalletController], 
  providers: [WalletService], 
})
export class WalletModule {}
