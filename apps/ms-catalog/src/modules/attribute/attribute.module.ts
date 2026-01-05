import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { DatabaseService } from '@/common/database.service';

@Module({
  imports: [],
  controllers: [AttributeController],
  providers: [AttributeService, DatabaseService],
})
export class AttributeModule { }
