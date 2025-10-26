import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsPositive,
  IsInt,
  IsUUID,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreateAirgearDto,
  CreateBagDto,
  CreateGloveDto,
  CreateOilDto,
  CreateTrophyDto,
} from './types';
import { CreateImageDto } from './types/create-image.dto';
export class CreateProductDto {
  //Main fields
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  weight?: number;

  @IsString()
  @IsOptional()
  includes?: string;

  //Simple relations
  @IsString()
  @IsUUID()
  statusId: string;

  @IsString()
  @IsUUID()
  brandId: string;

  @IsString()
  @IsUUID()
  categoryId: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  seriesId?: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  characterId?: string;

  //Many to many relations
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  @IsOptional()
  images?: CreateImageDto[];

  @IsArray()
  @IsUUID()
  @IsOptional()
  sportIds?: string[];

  @IsArray()
  @IsUUID()
  @IsOptional()
  tagIds?: string[];

  //Product types (just one can be defined)
  @IsObject()
  @ValidateNested()
  @Type(() => CreateBagDto)
  @IsOptional()
  bag?: CreateBagDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateGloveDto)
  @IsOptional()
  glove?: CreateGloveDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAirgearDto)
  @IsOptional()
  airgear?: CreateAirgearDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateOilDto)
  @IsOptional()
  oil?: CreateOilDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateTrophyDto)
  @IsOptional()
  trophy?: CreateTrophyDto;
}
