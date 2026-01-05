import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryAdminController } from './category-admin.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
  controllers: [CategoryController, CategoryAdminController],
  providers: [],
  imports: [NatsModule],
})
export class CategoryModule { }
