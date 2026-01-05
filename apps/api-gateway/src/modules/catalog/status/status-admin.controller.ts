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
import { CreateStatusDto, UpdateStatusDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('admin/status')
export class StatusAdminController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.client.send('adminCreateStatus', createStatusDto);
  }

  @Get()
  findAllProductsAdmin(@Query() filterDto: FilterDto) {
    return this.client.send('adminFindAllStatus', filterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('adminFindOneStatus', { id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.client.send('adminUpdateStatus', { ...updateStatusDto, id });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('adminRemoveStatus', { id });
  }
}
