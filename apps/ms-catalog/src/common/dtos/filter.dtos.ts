import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
