import {
  Controller,
  Get,
  Inject,
} from '@nestjs/common';
import { CreateSeriesDto, UpdateSeriesDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';

@Controller('series')
export class SeriesController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Get()
  findAll() {
    return this.client.send('findAllSeries', {});
  }

}
