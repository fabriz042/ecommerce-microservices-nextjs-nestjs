import { Controller } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @MessagePattern('createStatus')
  create(@Payload() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @MessagePattern('findAllStatus')
  findAll() {
    return this.statusService.findAll();
  }

  @MessagePattern('findOneStatus')
  findOne(@Payload() id: number) {
    return this.statusService.findOne(id);
  }

  @MessagePattern('updateStatus')
  update(@Payload() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(updateStatusDto.id, updateStatusDto);
  }

  @MessagePattern('removeStatus')
  remove(@Payload() id: number) {
    return this.statusService.remove(id);
  }
}
