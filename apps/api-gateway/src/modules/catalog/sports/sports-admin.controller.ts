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
import { CreateSportsDto, UpdateSportsDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('admin/sports')
export class SportsAdminController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    @Post()
    create(@Body() createSportsDto: CreateSportsDto) {
        return this.client.send('adminCreateSports', createSportsDto);
    }

    @Get()
    findAllSportsAdmin(@Query() filterDto: FilterDto) {
        return this.client.send('adminFindAllSports', filterDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminFindOneSports', { id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateSportsDto: UpdateSportsDto,
    ) {
        return this.client.send('adminUpdateSports', { ...updateSportsDto, id });
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminRemoveSports', { id });
    }
}
