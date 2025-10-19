import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [CharacterController],
  providers: [],
  imports: [NatsModule],
})
export class CharacterModule {}
