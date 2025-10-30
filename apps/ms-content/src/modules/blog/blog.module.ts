import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { DatabaseService } from 'src/common/database.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, DatabaseService],
})
export class BlogModule {}
