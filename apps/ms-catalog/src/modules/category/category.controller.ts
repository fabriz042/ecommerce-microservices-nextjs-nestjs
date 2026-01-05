import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from "@packages/shared-back";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------
  @MessagePattern('findAllCategory')
  findAll() {
    return this.categoryService.findAll();
  }

  //---------------------------------------------------------------
  // ADMIN METHODS
  //---------------------------------------------------------------
  @MessagePattern('adminFindAllCategory')
  adminFindAll(@Payload() filterDto: FilterDto) {
    return this.categoryService.adminFindAll(filterDto);
  }

  @MessagePattern('adminFindOneCategory')
  adminFindOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.categoryService.adminFindOne(id);
  }

  @MessagePattern('adminCreateCategory')
  adminCreate(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.adminCreate(createCategoryDto);
  }

  @MessagePattern('adminUpdateCategory')
  adminUpdate(@Payload() payload: any) {
    const { id, ...updateCategoryDto } = payload;
    return this.categoryService.adminUpdate(id, updateCategoryDto);
  }

  @MessagePattern('adminRemoveCategory')
  adminRemove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.categoryService.adminRemove(id);
  }
}
