import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateTagsDto, UpdateTagsDto } from "@packages/shared-back";
import { DatabaseService } from '@/common/database.service';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Injectable()
export class TagsService {
    constructor(private readonly db: DatabaseService) { }

    //---------------------------------------------------------------
    // PUBLIC METHODS
    //---------------------------------------------------------------

    findAll() {
        return this.db.tag.findMany();
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
        const totalResults = await this.db.tag.count({ where });
        const tags = await this.db.tag.findMany({
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
            data: tags,
        };
    }

    // Admin - Get one
    async adminFindOne(id: string) {
        const tags = await this.db.tag.findUnique({ where: { id } });
        if (!tags) {
            throw new RpcException({
                status: 404,
                message: `Tags ID ${id} not found`,
            });
        }
        return tags;
    }

    // Admin - Create
    adminCreate(createTagsDto: CreateTagsDto) {
        return this.db.tag.create({ data: createTagsDto });
    }

    // Admin - Update
    async adminUpdate(id: string, updateTagsDto: UpdateTagsDto) {
        await this.adminFindOne(id);
        return this.db.tag.update({
            where: { id },
            data: updateTagsDto,
        });
    }

    // Admin - Delete
    async adminRemove(id: string) {
        await this.adminFindOne(id);
        return this.db.tag.delete({ where: { id } });
    }
}
