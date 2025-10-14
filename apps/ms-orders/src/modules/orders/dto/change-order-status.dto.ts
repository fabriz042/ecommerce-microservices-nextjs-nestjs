import { IsEnum, IsUUID } from 'class-validator';
import { ORDER_STATUS } from 'generated/prisma/client';

export class ChangeOrderStatusDto {
  @IsUUID()
  id: string;

  @IsEnum(ORDER_STATUS)
  status: ORDER_STATUS;
}
