import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [StatusController],
  providers: [],
  imports: [NatsModule],
})
export class StatusModule {}
