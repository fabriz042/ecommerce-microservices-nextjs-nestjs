import { IsNumber } from 'class-validator';

export class CreateGloveDto {
  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  open_size: number;
}
