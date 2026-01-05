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
import { CreateSeriesDto, UpdateSeriesDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('admin/series')
export class SeriesAdminController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    @Post()
    create(@Body() createSeriesDto: CreateSeriesDto) {
        return this.client.send('adminCreateSeries', createSeriesDto);
    }

    @Get()
    findAllSeriesAdmin(@Query() filterDto: FilterDto) {
        return this.client.send('adminFindAllSeries', filterDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminFindOneSeries', { id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateSeriesDto: UpdateSeriesDto,
    ) {
        return this.client.send('adminUpdateSeries', { ...updateSeriesDto, id });
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminRemoveSeries', { id });
    }
}
