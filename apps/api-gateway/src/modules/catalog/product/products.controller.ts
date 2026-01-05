import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/';
import { NATS_SERVICE } from '@/config/services';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Get()
  findAllProducts(@Query() filterDto: FilterDto) {
    return this.client.send('findAllProducts', filterDto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.client.send('findOneProduct', { slug });
  }

  @Get(':id/recommendations')
  findRecommendations(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findRecommendations', { id });
  }

}
