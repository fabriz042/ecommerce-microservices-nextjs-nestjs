import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Inject,
    Query,
    ParseUUIDPipe,
    Patch,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('admin/brand')
export class BrandAdminController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    @Post()
    create(@Body() createBrandDto: CreateBrandDto) {
        return this.client.send('adminCreateBrand', createBrandDto);
    }

    @Get()
    findAllBrandsAdmin(@Query() filterDto: FilterDto) {
        return this.client.send('adminFindAllBrand', filterDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminFindOneBrand', { id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBrandDto: UpdateBrandDto,
    ) {
        return this.client.send('adminUpdateBrand', { ...updateBrandDto, id });
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminRemoveBrand', { id });
    }
}
