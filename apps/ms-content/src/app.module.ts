import { Module } from '@nestjs/common';
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [BlogModule],
})
export class AppModule {}
