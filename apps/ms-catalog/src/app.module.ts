import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { BrandModule } from './modules/brand/brand.module';
import { StatusModule } from './modules/status/status.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CategoryModule,
    ProductsModule,
    BrandModule,
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
