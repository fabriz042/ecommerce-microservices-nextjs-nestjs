import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [SeriesController],
  providers: [],
  imports: [NatsModule],
})
export class SeriesModule {}
