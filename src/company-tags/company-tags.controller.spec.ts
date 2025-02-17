import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTagsController } from './company-tags.controller';

describe('CompanyTagsController', () => {
  let controller: CompanyTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyTagsController],
    }).compile();

    controller = module.get<CompanyTagsController>(CompanyTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
