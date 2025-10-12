import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from '../../../generated/prisma';
import { RpcNotFound, RpcConflictException } from '@packages/shared/';

@Injectable()
export class CategoryService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('CategoryService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('____________Category connected to the database');
  }

  //Get all
  findAll() {
    return this.category.findMany();
  }

  //Get one
  async findOne(id: string) {
    const category = await this.category.findFirst({
      where: { id },
    });
    if (!category) throw RpcNotFound(`Category ${id} not found`);
    return category;
  }

  //Create
  create(createCategoryDto: CreateCategoryDto) {
    return this.category.create({
      data: createCategoryDto,
    });
  }

  //Update
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    const updatedCategory = await this.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    return updatedCategory;
  }

  //Delete
  async remove(id: string) {
    const relatedProducts = await this.product.findMany({
      where: { categoryId: id },
    });
    if (relatedProducts)
      throw RpcConflictException(`There are products related to this category`);

    await this.findOne(id);
    return this.category.delete({
      where: { id },
    });
  }
}
