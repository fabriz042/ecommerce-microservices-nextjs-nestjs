import { IsNumber } from 'class-validator';

export class CreateBagDto {
  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  depth: number;

  @IsNumber()
  pockets: number;

  @IsNumber()
  main_comp: number;

  @IsNumber()
  top_open: number;
}
