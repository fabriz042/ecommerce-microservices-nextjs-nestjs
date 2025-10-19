import { IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateTrophyDto {
  @IsNumber()
  length: number;

  @IsDateString()
  release_date: string;

  @IsDateString()
  expiration_date: string;

  @IsString()
  scale: string;
}
