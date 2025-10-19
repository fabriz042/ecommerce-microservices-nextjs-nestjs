import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @MessagePattern('createCharacter')
  create(@Payload() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @MessagePattern('findAllCharacter')
  findAll() {
    return this.characterService.findAll();
  }

  @MessagePattern('findOneCharacter')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.characterService.findOne(id);
  }

  @MessagePattern('updateCharacter')
  update(@Payload() updateCharacterDto: UpdateCharacterDto) {
    return this.characterService.update(
      updateCharacterDto.id,
      updateCharacterDto,
    );
  }

  @MessagePattern('removeCharacter')
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.characterService.remove(id);
  }
}
