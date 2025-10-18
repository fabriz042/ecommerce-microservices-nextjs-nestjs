import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [BrandController],
  providers: [],
  imports: [NatsModule],
})
export class BrandModule {}
