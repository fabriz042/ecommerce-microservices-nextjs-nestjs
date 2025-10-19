import { PartialType } from '@nestjs/mapped-types';
import { CreateSeriesDto } from './create-series.dto';
import { IsUUID } from 'class-validator';

export class UpdateSeriesDto extends PartialType(CreateSeriesDto) {
  @IsUUID()
  id: string;
}
