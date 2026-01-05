import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusAdminController } from './status-admin.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
  controllers: [StatusController, StatusAdminController],
  providers: [],
  imports: [NatsModule],
})
export class StatusModule { }
