import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AttributeModule } from './modules/attribute/attribute.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { CharacterModule } from './modules/character/character.module';
import { ProductsModule } from './modules/products/products.module';
import { SeriesModule } from './modules/series/series.module';
import { SportsModule } from './modules/sports/sports.module';
import { StatusModule } from './modules/status/status.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AttributeModule,
    BrandModule,
    CategoryModule,
    CharacterModule,
    ProductsModule,
    SeriesModule,
    SportsModule,
    StatusModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
