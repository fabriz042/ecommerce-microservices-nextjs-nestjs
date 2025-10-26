import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsUUID } from 'class-validator';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageDto } from './types/create-image.dto';
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsUUID()
  id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  @IsOptional()
  images?: CreateImageDto[];
}
