import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ToolCallFunctionDto {
  @IsString()
  name: string;

  @IsString()
  arguments: string;
}

export class ToolCallRequestDto {
  @IsString()
  id: string;

  @IsOptional()
  index?: number;

  @IsString()
  type?: string;

  @ValidateNested()
  @Type(() => ToolCallFunctionDto)
  function: ToolCallFunctionDto;
}
