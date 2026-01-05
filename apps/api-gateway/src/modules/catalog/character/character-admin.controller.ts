import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    Query,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { CreateCharacterDto, UpdateCharacterDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('admin/character')
export class CharacterAdminController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    @Post()
    create(@Body() createCharacterDto: CreateCharacterDto) {
        return this.client.send('adminCreateCharacter', createCharacterDto);
    }

    @Get()
    findAllCharactersAdmin(@Query() filterDto: FilterDto) {
        return this.client.send('adminFindAllCharacter', filterDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminFindOneCharacter', { id });
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCharacterDto: UpdateCharacterDto,
    ) {
        return this.client.send('adminUpdateCharacter', { ...updateCharacterDto, id });
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('adminRemoveCharacter', { id });
    }
}
