import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { DatabaseService } from 'src/common/database.service';

@Module({
  imports: [],
  controllers: [StatusController],
  providers: [StatusService, DatabaseService],
})
export class StatusModule {}
