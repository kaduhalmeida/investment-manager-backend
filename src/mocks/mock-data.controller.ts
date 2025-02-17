import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { MockDataService } from './mock-data.service';

@Controller('mocks')
export class MockDataController {
  constructor(private readonly mockDataService: MockDataService) {}

  @Get('companies') 
  getMockCompanies() { 
    return this.mockDataService.getMockCompanies();
  }

  @Get('companies/:id') 
  getMockCompanyById(@Param('id') id: string) {
    const company = this.mockDataService.getMockCompanyById(id);
    if (!company) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }
    return company;
  }
}
