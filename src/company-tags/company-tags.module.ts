import { Module } from '@nestjs/common';
import { CompanyTagsService } from './company-tags.service';
import { CompanyTagsController } from './company-tags.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], 
  providers: [CompanyTagsService], 
  controllers: [CompanyTagsController]
})
export class CompanyTagsModule {}
