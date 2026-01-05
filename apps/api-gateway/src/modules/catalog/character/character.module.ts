import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterAdminController } from './character-admin.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
  controllers: [CharacterController, CharacterAdminController],
  providers: [],
  imports: [NatsModule],
})
export class CharacterModule { }
