import { IsNumber } from 'class-validator';

export class CreateAirgearDto {
  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  depth: number;

  @IsNumber()
  number_holes: number;
}
