import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandAdminController } from './brand-admin.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
  controllers: [BrandController, BrandAdminController],
  providers: [],
  imports: [NatsModule],
})
export class BrandModule { }
