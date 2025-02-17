import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MockDataService } from '../mocks/mock-data.service';  

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, MockDataService], 
})
export class CompanyModule {}
