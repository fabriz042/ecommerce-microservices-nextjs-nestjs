import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller()
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @MessagePattern('createBrand')
  create(@Payload() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @MessagePattern('findAllBrand')
  findAll() {
    return this.brandService.findAll();
  }

  @MessagePattern('findOneBrand')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.brandService.findOne(id);
  }

  @MessagePattern('updateBrand')
  update(@Payload() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(updateBrandDto.id, updateBrandDto);
  }

  @MessagePattern('removeBrand')
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.brandService.remove(id);
  }
}
