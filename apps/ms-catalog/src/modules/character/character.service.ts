import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { DatabaseService } from 'src/common/database.service';

@Injectable()
export class CharacterService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    return this.db.character.findMany();
  }

  async findOne(id: string) {
    const character = await this.db.character.findUnique({ where: { id } });
    if (!character) {
      throw new RpcException({
        status: 404,
        message: `Character ID ${id} not found`,
      });
    }
    return character;
  }

  create(createCharacterDto: CreateCharacterDto) {
    return this.db.character.create({ data: createCharacterDto });
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    await this.findOne(id);
    const updatedCharacter = await this.db.character.update({
      where: { id },
      data: updateCharacterDto,
    });
    return updatedCharacter;
  }

  async remove(id: string) {
    const relatedProducts = await this.db.product.findMany({
      where: { characterId: id },
    });
    if (relatedProducts)
      throw new RpcException({
        status: 409,
        message: `There are products related to this character`,
      });

    await this.findOne(id);
    return this.db.character.delete({ where: { id } });
  }
}
