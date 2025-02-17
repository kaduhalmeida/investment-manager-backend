import { Controller, Post, Param, Delete } from '@nestjs/common';
import { CompanyTagsService } from './company-tags.service';

@Controller('company-tags')
export class CompanyTagsController {
  constructor(private readonly companyTagsService: CompanyTagsService) {}

  @Post(':companyId/:tagId')
  addTagToCompany(@Param('companyId') companyId: string, @Param('tagId') tagId: string) {
    return this.companyTagsService.addTagToCompany(companyId, tagId);
  }

  @Delete(':companyId/:tagId')
  removeTagFromCompany(@Param('companyId') companyId: string, @Param('tagId') tagId: string) {
    return this.companyTagsService.removeTagFromCompany(companyId, tagId);
  }
}
