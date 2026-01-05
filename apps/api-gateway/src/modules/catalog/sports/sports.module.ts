import { Module } from '@nestjs/common';
import { SportsController } from './sports.controller';
import { SportsAdminController } from './sports-admin.controller';
import { NatsModule } from '@/transports/nats.module';

@Module({
    controllers: [SportsController, SportsAdminController],
    providers: [],
    imports: [NatsModule],
})
export class SportsModule { }
