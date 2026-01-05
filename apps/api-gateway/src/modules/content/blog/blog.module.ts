import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
  controllers: [BlogController],
  imports: [NatsModule],
})
export class BlogModule { }
