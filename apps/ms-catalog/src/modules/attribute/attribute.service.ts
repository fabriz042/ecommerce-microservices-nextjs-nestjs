import { Injectable } from '@nestjs/common';
import { CreateAttributeDto, UpdateAttributeDto } from "@packages/shared-back";
import { DatabaseService } from '@/common/database.service';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Injectable()
export class AttributeService {
  constructor(private readonly db: DatabaseService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------

  findAll() {
    return this.db.attribute.findMany();
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
    const totalResults = await this.db.attribute.count({ where });
    const attributes = await this.db.attribute.findMany({
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
      data: attributes,
    };
  }

  // Admin - Get one
  async adminFindOne(id: string) {
    const attribute = await this.db.attribute.findUnique({ where: { id } });
    if (!attribute) {
      throw new RpcException({
        status: 404,
        message: `Attribute ID ${id} not found`,
      });
    }
    return attribute;
  }

  // Admin - Create
  adminCreate(createAttributeDto: CreateAttributeDto) {
    return this.db.attribute.create({ data: createAttributeDto });
  }

  // Admin - Update
  async adminUpdate(id: string, updateAttributeDto: UpdateAttributeDto) {
    await this.adminFindOne(id);
    return this.db.attribute.update({ where: { id }, data: updateAttributeDto });
  }

  // Admin - Delete
  async adminRemove(id: string) {
    await this.adminFindOne(id);
    const attributes = await this.db.oil.findMany({ where: { attributeId: id } });
    if (attributes.length > 0) {
      throw new RpcException({
        status: 409,
        message: `Attribute ID ${id} has associated products`,
      });
    }
    return this.db.attribute.delete({ where: { id } });
  }
}
