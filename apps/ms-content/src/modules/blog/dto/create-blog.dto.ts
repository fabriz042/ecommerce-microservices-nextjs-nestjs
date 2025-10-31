import { IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
