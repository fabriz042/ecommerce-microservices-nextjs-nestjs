import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsUUID } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsUUID()
  id: string;
}
