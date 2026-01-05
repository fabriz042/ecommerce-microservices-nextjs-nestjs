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
import { CreateAttributeDto, UpdateAttributeDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('admin/attribute')
export class AttributeAdminController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    @Post()
    create(@Body() createAttributeDto: CreateAttributeDto) {
        return this.client.send('adminCreateAttribute', createAttributeDto);
    }

    @Get()
    findAllAttributesAdmin(@Query() filterDto: FilterDto) {
        return this.client.send('adminFindAllAttribute', filterDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminFindOneAttribute', { id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ) {
        return this.client.send('adminUpdateAttribute', { ...updateAttributeDto, id });
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminRemoveAttribute', { id });
    }
}
