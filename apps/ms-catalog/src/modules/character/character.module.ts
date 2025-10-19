import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { DatabaseService } from '../../common/database.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, DatabaseService],
})
export class CharacterModule {}
