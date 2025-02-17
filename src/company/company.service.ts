import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MockDataService } from '../mocks/mock-data.service';

@Injectable()
export class CompanyService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private mockDataService: MockDataService,
  ) {}

  async onModuleInit() {
    await this.createMockCompanies();
  }

  async createMockCompanies() {
    const existingCompanies = await this.prisma.company.count();
    if (existingCompanies > 0) return;

    const mockCompanies = this.mockDataService.getMockCompanies();

    const companiesToCreate = mockCompanies.map((company) => ({
      id: company.id,
      name: company.name,
      description: company.description,
      sector: company.sector,
      website: company.website,
      logo: company.logo,
      stage: company.stage,
      valuation: company.valuation,
      unitPrice: company.unitPrice,
      risk: JSON.stringify({
        label: company.risk?.label,
        percentage: company.risk?.percentage,
      }),
      valuationHistory: JSON.stringify(company.valuationHistory), 
      debt: company.debt,              
      debtValue: company.debtValue,    
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    }));

    await this.prisma.company.createMany({ data: companiesToCreate });
  }

  async findAll() {
    return this.prisma.company.findMany({
      include: { tags: true },
    });
  }

  async findOne(id: string) {
    console.log("Buscando empresa com o ID:", id);
    const company = await this.prisma.company.findUnique({
      where: { id },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async create(data: any) {
    return this.prisma.company.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.company.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }
}
