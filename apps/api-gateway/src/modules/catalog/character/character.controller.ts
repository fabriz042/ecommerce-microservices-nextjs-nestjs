import {
  Controller,
  Get,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { NATS_SERVICE } from '@/config/services';

@Controller('character')
export class CharacterController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Get()
  findAll() {
    return this.client.send('findAllCharacter', {});
  }

}
