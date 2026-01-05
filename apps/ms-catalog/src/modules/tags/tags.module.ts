import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { DatabaseService } from '@/common/database.service';

@Module({
    controllers: [TagsController],
    providers: [TagsService, DatabaseService],
})
export class TagsModule { }
