import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateCharacterDto, UpdateCharacterDto } from "@packages/shared-back";
import { DatabaseService } from '@/common/database.service';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Injectable()
export class CharacterService {
  constructor(private readonly db: DatabaseService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------

  findAll() {
    return this.db.character.findMany();
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
    const totalResults = await this.db.character.count({ where });
    const characters = await this.db.character.findMany({
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
      data: characters,
    };
  }

  // Admin - Get one
  async adminFindOne(id: string) {
    const character = await this.db.character.findUnique({ where: { id } });
    if (!character) {
      throw new RpcException({
        status: 404,
        message: `Character ID ${id} not found`,
      });
    }
    return character;
  }

  // Admin - Create
  adminCreate(createCharacterDto: CreateCharacterDto) {
    return this.db.character.create({ data: createCharacterDto });
  }

  // Admin - Update
  async adminUpdate(id: string, updateCharacterDto: UpdateCharacterDto) {
    await this.adminFindOne(id);
    return this.db.character.update({
      where: { id },
      data: updateCharacterDto,
    });
  }

  // Admin - Delete
  async adminRemove(id: string) {
    await this.adminFindOne(id);
    const relatedProducts = await this.db.product.findMany({
      where: { characterId: id },
    });
    if (relatedProducts.length > 0) {
      throw new RpcException({
        status: 409,
        message: `There are products related to this character`,
      });
    }
    return this.db.character.delete({ where: { id } });
  }
}
