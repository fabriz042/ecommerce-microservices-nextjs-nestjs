import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto, UpdateAttributeDto } from "@packages/shared-back";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller()
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------
  @MessagePattern('findAllAttribute')
  findAll() {
    return this.attributeService.findAll();
  }

  //---------------------------------------------------------------
  // ADMIN METHODS
  //---------------------------------------------------------------
  @MessagePattern('adminFindAllAttribute')
  adminFindAll(@Payload() filterDto: FilterDto) {
    return this.attributeService.adminFindAll(filterDto);
  }

  @MessagePattern('adminFindOneAttribute')
  adminFindOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.attributeService.adminFindOne(id);
  }

  @MessagePattern('adminCreateAttribute')
  adminCreate(@Payload() createAttributeDto: CreateAttributeDto) {
    return this.attributeService.adminCreate(createAttributeDto);
  }

  @MessagePattern('adminUpdateAttribute')
  adminUpdate(@Payload() payload: any) {
    const { id, ...updateAttributeDto } = payload;
    return this.attributeService.adminUpdate(id, updateAttributeDto);
  }

  @MessagePattern('adminRemoveAttribute')
  adminRemove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.attributeService.adminRemove(id);
  }
}
