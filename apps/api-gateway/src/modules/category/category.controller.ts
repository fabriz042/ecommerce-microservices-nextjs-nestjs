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
import { HttpErrorFactory } from 'src/common/http-errors';
import { catchError } from 'rxjs/internal/operators/catchError';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject('CATALOG_SERVICE') private readonly categoryClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryClient.send('createCategory', createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryClient.send('findAllCategory', {});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryClient.send('findOneCategory', { id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryClient.send('updateCategory', {
      id,
      ...updateCategoryDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryClient
      .send('removeCategory', { id })
      .pipe(catchError((error) => HttpErrorFactory(error)));
  }
}
