import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsAdminController } from './products-admin.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
  controllers: [ProductsController, ProductsAdminController],
  providers: [],
  imports: [NatsModule],
})
export class ProductsModule { }
