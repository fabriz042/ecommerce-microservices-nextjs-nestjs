import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from 'src/config/services';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FilterDto } from 'src/common/dtos/filter.dtos';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  // @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send('createProduct', createProductDto);
  }

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

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client.send('updateProduct', {
      id,
      ...updateProductDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('removeProduct', { id });
  }
}
