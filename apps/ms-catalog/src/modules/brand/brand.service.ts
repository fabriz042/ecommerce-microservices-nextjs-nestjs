import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateBrandDto, UpdateBrandDto } from '@packages/shared-back';
import { DatabaseService } from '@/common/database.service';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Injectable()
export class BrandService {
  constructor(private readonly db: DatabaseService) { }

  findAll() {
    return this.db.brand.findMany();
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
    const totalResults = await this.db.brand.count({ where });
    const brands = await this.db.brand.findMany({
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
      data: brands,
    };
  }

  async adminFindOne(id: string) {
    const brand = await this.db.brand.findUnique({ where: { id } });
    if (!brand) {
      throw new RpcException({
        status: 404,
        message: `Brand ID ${id} not found`,
      });
    }
    return brand;
  }

  adminCreate(createBrandDto: CreateBrandDto) {
    return this.db.brand.create({ data: createBrandDto });
  }

  async adminUpdate(id: string, updateBrandDto: UpdateBrandDto) {
    await this.adminFindOne(id);
    return this.db.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async adminRemove(id: string) {
    await this.adminFindOne(id);
    const products = await this.db.product.findMany({ where: { brandId: id } });
    if (products.length > 0) {
      throw new RpcException({
        status: 400,
        message: `Brand ID ${id} has associated products`,
      });
    }
    return this.db.brand.delete({ where: { id } });
  }
}
