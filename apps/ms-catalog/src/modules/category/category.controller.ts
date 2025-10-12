import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //Create
  @MessagePattern('createCategory')
  create(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  //Get all
  @MessagePattern('findAllCategory')
  findAll() {
    return this.categoryService.findAll();
  }

  //Get one
  @MessagePattern('findOneCategory')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findOne(id);
  }

  //Update
  @MessagePattern('updateCategory')
  update(@Payload() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto.id, updateCategoryDto);
  }

  //Delete
  @MessagePattern('removeCategory')
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
