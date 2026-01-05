import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    Query,
    ParseUUIDPipe,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('admin/category')
export class CategoryAdminController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.client.send('adminCreateCategory', createCategoryDto);
    }

    @Get()
    findAllCategoriesAdmin(@Query() filterDto: FilterDto) {
        return this.client.send('adminFindAllCategory', filterDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminFindOneCategory', { id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.client.send('adminUpdateCategory', { ...updateCategoryDto, id });
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminRemoveCategory', { id });
    }
}
