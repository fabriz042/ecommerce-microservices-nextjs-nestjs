import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto, UpdateStatusDto } from "@packages/shared-back";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------
  @MessagePattern('findAllStatus')
  findAll() {
    return this.statusService.findAll();
  }

  //---------------------------------------------------------------
  // ADMIN METHODS
  //---------------------------------------------------------------
  @MessagePattern('adminFindAllStatus')
  adminFindAll(@Payload() filterDto: FilterDto) {
    return this.statusService.adminFindAll(filterDto);
  }

  @MessagePattern('adminFindOneStatus')
  adminFindOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.statusService.adminFindOne(id);
  }

  @MessagePattern('adminCreateStatus')
  adminCreate(@Payload() createStatusDto: CreateStatusDto) {
    return this.statusService.adminCreate(createStatusDto);
  }

  @MessagePattern('adminUpdateStatus')
  adminUpdate(@Payload() payload: any) {
    const { id, ...updateStatusDto } = payload;
    return this.statusService.adminUpdate(id, updateStatusDto);
  }

  @MessagePattern('adminRemoveStatus')
  adminRemove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.statusService.adminRemove(id);
  }
}
