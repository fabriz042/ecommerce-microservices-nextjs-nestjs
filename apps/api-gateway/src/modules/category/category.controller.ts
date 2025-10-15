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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';

@Controller('category')
export class CategoryController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.client.send('createCategory', createCategoryDto);
  }

  @Get()
  findAll() {
    return this.client.send('findAllCategory', {});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneCategory', { id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.client.send('updateCategory', {
      id,
      ...updateCategoryDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeCategory', { id });
  }
}
