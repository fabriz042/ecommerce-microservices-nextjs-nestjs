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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { catchError } from 'rxjs/operators';
import { HttpErrorFactory } from 'src/common/http-errors';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send('createProduct', createProductDto);
  }

  @Get()
  findAllProducts() {
    return this.productsClient.send('findAllProducts', {});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsClient
      .send('findOneProduct', { id })
      .pipe(catchError((error) => HttpErrorFactory(error)));
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send('updateProduct', {
        id,
        ...updateProductDto,
      })
      .pipe(catchError((error) => HttpErrorFactory(error)));
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsClient
      .send('removeProduct', { id })
      .pipe(catchError((error) => HttpErrorFactory(error)));
  }
}
