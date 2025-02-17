import { Injectable } from '@nestjs/common';
import { fakerPT_BR } from '@faker-js/faker';

const faker = fakerPT_BR;

export interface CompanyType {
  id: string;
  name: string;
  description: string;
  sector: string;
  website: string;
  logo: string;
  stage: string;
  valuation: number;
  unitPrice: number;
  risk: { label: string; percentage: number };
  tags: { id: string; name: string }[];
  valuationHistory: { date: Date, valuation: number }[]; 
  debt: boolean;  
  debtValue: number | null;  
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class MockDataService {
  private companies: CompanyType[];

  constructor() {
    this.initializeMockCompanies();
  }

  private initializeMockCompanies() {
    if (!this.companies || this.companies.length === 0) {
      this.companies = this.generateMockCompanies();
      console.log("Empresas geradas:", this.companies);
    }
  }

  private generateMockCompanies(): CompanyType[] {
    const stages = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+'];

    const valuationRanges: Record<string, { min: number; max: number }> = {
      'Pre-Seed': { min: 500_000, max: 2_000_000 },
      'Seed': { min: 1_500_000, max: 5_000_000 },
      'Series A': { min: 3_000_000, max: 6_000_000 },
      'Series B': { min: 5_000_000, max: 8_000_000 },
      'Series C': { min: 5_000_000, max: 9_000_000 },
      'Series D+': { min: 5_000_000, max: 12_000_000 },
    };

    const riskLevels: Record<string, { label: string; percentage: number }> = {
      'Pre-Seed': { label: 'Muito Alto', percentage: faker.number.int({ min: 70, max: 90 }) },
      'Seed': { label: 'Alto', percentage: faker.number.int({ min: 50, max: 70 }) },
      'Series A': { label: 'Médio-Alto', percentage: faker.number.int({ min: 40, max: 50 }) },
      'Series B': { label: 'Médio', percentage: faker.number.int({ min: 25, max: 40 }) },
      'Series C': { label: 'Baixo', percentage: faker.number.int({ min: 10, max: 25 }) },
      'Series D+': { label: 'Muito Baixo', percentage: faker.number.int({ min: 5, max: 10 }) },
    };

    return Array.from({ length: 30 }).map(() => {
      const stage = faker.helpers.arrayElement(stages);
      const unitPrice = faker.number.int({ min: 10, max: 500 });
      const valuation = faker.number.int(valuationRanges[stage]);
      
      
      const valuationHistory = Array.from({ length: 5 }).map(() => ({
        date: faker.date.past({ years: 5 }),  
        valuation: faker.number.int({ min: valuation - 1_000_000, max: valuation + 1_000_000 }),
      }));;

      const debt = faker.datatype.boolean();
      const debtValue = debt ? faker.number.int({ min: 100_000, max: 2_000_000 }) : null;

      return {
        id: faker.string.uuid(),
        name: faker.company.name(),
        description: faker.lorem.paragraphs(5),
        sector: faker.helpers.arrayElement([
          'Tecnologia', 'Finanças', 'Saúde', 'Energia', 'Educação', 'Agronegócio',
        ]),
        website: faker.internet.url(),
        logo: faker.image.urlPicsumPhotos(),
        stage,
        valuation,
        unitPrice,
        risk: riskLevels[stage],
        tags: [
          { id: faker.string.uuid(), name: faker.word.noun() },
          { id: faker.string.uuid(), name: faker.word.noun() },
        ],
        valuationHistory,  
        debt,              
        debtValue,        
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
    });
  }

  getMockCompanies(): CompanyType[] {
    return this.companies; 
  }

  getMockCompanyById(id: string): CompanyType | null {
    console.log("ID recebido:", id);
    const company = this.companies.find((company) => company.id === id);
    console.log("Empresa encontrada:", company);
    return company || null;
  }
}
