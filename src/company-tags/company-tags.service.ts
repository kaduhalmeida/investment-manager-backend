import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyTagsService {
  constructor(private prisma: PrismaService) {}

  async addTagToCompany(companyId: string, tagId: string) {
    return this.prisma.companyTags.create({
      data: { companyId, tagId },
    });
  }

  async removeTagFromCompany(companyId: string, tagId: string) {
    return this.prisma.companyTags.delete({
      where: { companyId_tagId: { companyId, tagId } },
    });
  }
}
