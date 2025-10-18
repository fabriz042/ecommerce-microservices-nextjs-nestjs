import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { NATS_SERVICE } from 'src/config/services';

@Controller('brand')
export class BrandController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.client.send('createBrand', createBrandDto);
  }

  @Get()
  findAll() {
    return this.client.send('findAllBrand', {});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneBrand', { id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.client.send('updateBrand', { id, ...updateBrandDto });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('removeBrand', { id });
  }
}
