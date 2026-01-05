import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsAdminController } from './tags-admin.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
    controllers: [TagsController, TagsAdminController],
    providers: [],
    imports: [NatsModule],
})
export class TagsModule { }
