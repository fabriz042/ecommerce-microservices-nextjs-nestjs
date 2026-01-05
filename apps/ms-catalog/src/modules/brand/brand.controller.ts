import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from "@packages/shared-back";
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller()
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------
  @MessagePattern('findAllBrand')
  findAll() {
    return this.brandService.findAll();
  }

  //---------------------------------------------------------------
  // ADMIN METHODS
  //---------------------------------------------------------------
  @MessagePattern('adminFindAllBrand')
  adminFindAll(@Payload() filterDto: FilterDto) {
    return this.brandService.adminFindAll(filterDto);
  }

  @MessagePattern('adminFindOneBrand')
  adminFindOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.brandService.adminFindOne(id);
  }

  @MessagePattern('adminCreateBrand')
  adminCreate(@Payload() createBrandDto: CreateBrandDto) {
    return this.brandService.adminCreate(createBrandDto);
  }

  @MessagePattern('adminUpdateBrand')
  adminUpdate(@Payload() payload: any) {
    const { id, ...updateBrandDto } = payload;
    return this.brandService.adminUpdate(id, updateBrandDto);
  }

  @MessagePattern('adminRemoveBrand')
  adminRemove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.brandService.adminRemove(id);
  }
}
