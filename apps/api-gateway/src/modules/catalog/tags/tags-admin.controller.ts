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
import { CreateTagsDto, UpdateTagsDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('admin/tags')
export class TagsAdminController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    @Post()
    create(@Body() createTagsDto: CreateTagsDto) {
        return this.client.send('adminCreateTags', createTagsDto);
    }

    @Get()
    findAllTagsAdmin(@Query() filterDto: FilterDto) {
        return this.client.send('adminFindAllTags', filterDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminFindOneTags', { id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTagsDto: UpdateTagsDto,
    ) {
        return this.client.send('adminUpdateTags', { ...updateTagsDto, id });
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminRemoveTags', { id });
    }
}
