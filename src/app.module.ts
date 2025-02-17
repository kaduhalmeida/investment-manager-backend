import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { InvestmentModule } from './investment/investment.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { CompanyModule } from './company/company.module';
import { TagModule } from './tag/tag.module';
import { CompanyTagsModule } from './company-tags/company-tags.module';



@Module({
    imports: [
        AuthModule,
        WalletModule,
        InvestmentModule,
        UserModule,
        TransactionModule,
        CompanyModule,
        TagModule,
        CompanyTagsModule,
    ],
    controllers: [AppController], 
    providers: [AppService],     
})
export class AppModule {}