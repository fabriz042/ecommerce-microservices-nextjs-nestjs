import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto, UpdateCharacterDto } from "@packages/shared-back";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller()
export class CharacterController {
  constructor(private readonly characterService: CharacterService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------
  @MessagePattern('findAllCharacter')
  findAll() {
    return this.characterService.findAll();
  }

  //---------------------------------------------------------------
  // ADMIN METHODS
  //---------------------------------------------------------------
  @MessagePattern('adminFindAllCharacter')
  adminFindAll(@Payload() filterDto: FilterDto) {
    return this.characterService.adminFindAll(filterDto);
  }

  @MessagePattern('adminFindOneCharacter')
  adminFindOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.characterService.adminFindOne(id);
  }

  @MessagePattern('adminCreateCharacter')
  adminCreate(@Payload() createCharacterDto: CreateCharacterDto) {
    return this.characterService.adminCreate(createCharacterDto);
  }

  @MessagePattern('adminUpdateCharacter')
  adminUpdate(@Payload() payload: any) {
    const { id, ...updateCharacterDto } = payload;
    return this.characterService.adminUpdate(id, updateCharacterDto);
  }

  @MessagePattern('adminRemoveCharacter')
  adminRemove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.characterService.adminRemove(id);
  }
}
