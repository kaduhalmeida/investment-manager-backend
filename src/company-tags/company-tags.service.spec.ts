import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTagsService } from './company-tags.service';

describe('CompanyTagsService', () => {
  let service: CompanyTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyTagsService],
    }).compile();

    service = module.get<CompanyTagsService>(CompanyTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
