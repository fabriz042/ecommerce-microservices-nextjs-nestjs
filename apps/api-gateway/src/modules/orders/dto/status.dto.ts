import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatusList, ORDER_STATUS } from '../enum/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList}`,
  })
  status: ORDER_STATUS;
}
