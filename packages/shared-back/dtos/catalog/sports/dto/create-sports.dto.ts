import { IsString } from 'class-validator';

export class CreateSportsDto {
    @IsString()
    name: string;
}
