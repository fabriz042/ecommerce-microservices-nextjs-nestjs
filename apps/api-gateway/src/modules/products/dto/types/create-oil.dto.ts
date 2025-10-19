import { IsNumber, IsString } from 'class-validator';

export class CreateOilDto {
  @IsNumber()
  volume: number;

  @IsString()
  attributeId: string;
}
