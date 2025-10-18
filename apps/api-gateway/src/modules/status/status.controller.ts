import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';

@Controller('status')
export class StatusController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.client.send('createStatus', createStatusDto);
  }

  @Get()
  findAll() {
    return this.client.send('findAllStatus', {});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneStatus', { id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.client.send('updateStatus', { id, ...updateStatusDto });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('removeStatus', { id });
  }
}
