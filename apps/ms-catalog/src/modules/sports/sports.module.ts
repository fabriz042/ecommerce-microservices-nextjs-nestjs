import { Module } from '@nestjs/common';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';
import { DatabaseService } from '@/common/database.service';

@Module({
    controllers: [SportsController],
    providers: [SportsService, DatabaseService],
})
export class SportsModule { }
