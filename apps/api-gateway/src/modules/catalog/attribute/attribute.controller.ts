import {
  Controller,
  Get,
  Inject,
} from '@nestjs/common';
import { NATS_SERVICE } from '@/config/services';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';

@Controller('attribute')
export class AttributeController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Get()
  findAll() {
    return this.client.send('findAllAttribute', {});
  }

}
