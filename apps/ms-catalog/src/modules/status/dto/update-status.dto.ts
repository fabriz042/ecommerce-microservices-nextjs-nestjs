import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusDto } from './create-status.dto';
import { IsUUID } from 'class-validator';

export class UpdateStatusDto extends PartialType(CreateStatusDto) {
  @IsUUID()
  id: string;
}
