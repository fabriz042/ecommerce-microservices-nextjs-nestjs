import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from "@packages/shared-back";
import { PrismaClient } from '../../../generated/prisma';
import { RpcException } from '@nestjs/microservices';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Injectable()
export class CategoryService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('CategoryService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('____________Category connected to the database');
  }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------

  findAll() {
    return this.category.findMany();
  }

  //---------------------------------------------------------------
  // ADMIN METHODS
  //---------------------------------------------------------------

  // Admin - Get all
  async adminFindAll(filterDto: FilterDto) {
    //Pagination params
    const page = filterDto.page ?? 1;
    const per_page = Math.min(filterDto.per_page ?? 10, 100);

    //Filters
    const { search } = filterDto;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    //Query
    const totalResults = await this.category.count({ where });
    const categories = await this.category.findMany({
      where,
      skip: (page - 1) * per_page,
      take: per_page,
      select: {
        id: true,
        name: true,
      },
    });

    // Meta info
    const totalPages = Math.ceil(totalResults / per_page);
    const hasNext = totalResults > page * per_page;
    const hasPrevious = page > 1;

    //Response
    return {
      meta: {
        total_items: totalResults,
        current_page: page,
        per_page: per_page,
        total_pages: totalPages,
        has_next: hasNext,
        has_previous: hasPrevious,
      },
      data: categories,
    };
  }

  // Admin - Get one
  async adminFindOne(id: string) {
    const category = await this.category.findUnique({ where: { id } });
    if (!category) {
      throw new RpcException({
        status: 404,
        message: `Category ID ${id} not found`,
      });
    }
    return category;
  }

  // Admin - Create
  adminCreate(createCategoryDto: CreateCategoryDto) {
    return this.category.create({ data: createCategoryDto });
  }

  // Admin - Update
  async adminUpdate(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.adminFindOne(id);
    return this.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  // Admin - Delete
  async adminRemove(id: string) {
    await this.adminFindOne(id);
    const relatedProducts = await this.product.findMany({
      where: { categoryId: id },
    });
    if (relatedProducts.length > 0) {
      throw new RpcException({
        status: 409,
        message: `There are products related to this category`,
      });
    }
    return this.category.delete({ where: { id } });
  }
}
