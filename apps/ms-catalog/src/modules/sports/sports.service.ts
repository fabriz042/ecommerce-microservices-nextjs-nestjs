import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateSportsDto, UpdateSportsDto } from "@packages/shared-back";
import { DatabaseService } from '@/common/database.service';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Injectable()
export class SportsService {
    constructor(private readonly db: DatabaseService) { }

    //---------------------------------------------------------------
    // PUBLIC METHODS
    //---------------------------------------------------------------

    findAll() {
        return this.db.sport.findMany();
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
        const totalResults = await this.db.sport.count({ where });
        const sports = await this.db.sport.findMany({
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
            data: sports,
        };
    }

    // Admin - Get one
    async adminFindOne(id: string) {
        const sports = await this.db.sport.findUnique({ where: { id } });
        if (!sports) {
            throw new RpcException({
                status: 404,
                message: `Sports ID ${id} not found`,
            });
        }
        return sports;
    }

    // Admin - Create
    adminCreate(createSportsDto: CreateSportsDto) {
        return this.db.sport.create({ data: createSportsDto });
    }

    // Admin - Update
    async adminUpdate(id: string, updateSportsDto: UpdateSportsDto) {
        await this.adminFindOne(id);
        return this.db.sport.update({
            where: { id },
            data: updateSportsDto,
        });
    }

    // Admin - Delete
    async adminRemove(id: string) {
        await this.adminFindOne(id);
        return this.db.sport.delete({ where: { id } });
    }
}
