import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    return this.prisma.tag.create({
      data: createTagDto,
    });
  }

  async findAll() {
    return this.prisma.tag.findMany();
  }

  async findOne(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
    return tag;
  }

  async remove(id: string) {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
