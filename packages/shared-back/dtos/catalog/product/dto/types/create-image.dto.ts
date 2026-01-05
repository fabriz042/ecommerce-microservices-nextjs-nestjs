import { IsString, IsInt, Min } from 'class-validator';

export class CreateImageDto {
  @IsString()
  image_url: string;

  @IsString()
  alt_text: string;

  @IsInt()
  @Min(0)
  order: number;
}
