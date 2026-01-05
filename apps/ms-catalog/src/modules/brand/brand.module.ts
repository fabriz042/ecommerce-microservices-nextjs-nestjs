import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { DatabaseService } from '@/common/database.service';

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [BrandService, DatabaseService],
})
export class BrandModule { }
