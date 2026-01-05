import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesAdminController } from './series-admin.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
  controllers: [SeriesController, SeriesAdminController],
  providers: [],
  imports: [NatsModule],
})
export class SeriesModule { }
