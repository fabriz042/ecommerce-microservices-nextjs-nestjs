import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateSeriesDto, UpdateSeriesDto } from "@packages/shared-back";
import { DatabaseService } from '@/common/database.service';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Injectable()
export class SeriesService {
  constructor(private readonly db: DatabaseService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------

  findAll() {
    return this.db.series.findMany();
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
    const totalResults = await this.db.series.count({ where });
    const series = await this.db.series.findMany({
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
      data: series,
    };
  }

  // Admin - Get one
  async adminFindOne(id: string) {
    const series = await this.db.series.findUnique({ where: { id } });
    if (!series) {
      throw new RpcException({
        status: 404,
        message: `Series ID ${id} not found`,
      });
    }
    return series;
  }

  // Admin - Create
  adminCreate(createSeriesDto: CreateSeriesDto) {
    return this.db.series.create({ data: createSeriesDto });
  }

  // Admin - Update
  async adminUpdate(id: string, updateSeriesDto: UpdateSeriesDto) {
    await this.adminFindOne(id);
    return this.db.series.update({
      where: { id },
      data: updateSeriesDto,
    });
  }

  // Admin - Delete
  async adminRemove(id: string) {
    await this.adminFindOne(id);
    const relatedProducts = await this.db.product.findMany({
      where: { seriesId: id },
    });
    if (relatedProducts.length > 0) {
      throw new RpcException({
        status: 409,
        message: `There are products related to this series`,
      });
    }
    return this.db.series.delete({ where: { id } });
  }
}
