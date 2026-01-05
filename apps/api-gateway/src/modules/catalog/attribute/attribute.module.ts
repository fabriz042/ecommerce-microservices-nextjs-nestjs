import { Module } from '@nestjs/common';
import { AttributeController } from './attribute.controller';
import { AttributeAdminController } from './attribute-admin.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
  controllers: [AttributeController, AttributeAdminController],
  providers: [],
  imports: [NatsModule],
})
export class AttributeModule { }