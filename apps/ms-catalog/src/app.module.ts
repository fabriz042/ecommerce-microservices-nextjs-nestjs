import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { BrandModule } from './modules/brand/brand.module';
import { StatusModule } from './modules/status/status.module';
import { SeriesModule } from './modules/series/series.module';
import { CharacterModule } from './modules/character/character.module';
import { AttributeModule } from './modules/attribute/attribute.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CategoryModule,
    AttributeModule,
    ProductsModule,
    BrandModule,
    StatusModule,
    SeriesModule,
    CharacterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
