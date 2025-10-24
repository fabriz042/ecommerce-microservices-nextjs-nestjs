import { Controller, ParseUUIDPipe, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FilterDto } from 'src/common/dtos/filter.dtos';
import { ToolCallRequestDto } from './dto/mcp-request.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Create
  @MessagePattern('createProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //Get all
  @MessagePattern('findAllProducts')
  findAll(@Payload() filterDto: FilterDto) {
    return this.productsService.findAll(filterDto);
  }

  //Get one
  @MessagePattern('findOneProduct')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  //Update
  @MessagePattern('updateProduct')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  //Delete
  @MessagePattern('removeProduct')
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }

  //---------------------------------------------------------------
  // MS-ORDERS
  @MessagePattern('validateProduct')
  validateProduct(@Payload() id: string[]) {
    return this.productsService.validateProduct(id);
  }

  //----------------------------------------------------------------
  // MS-CHATBOT
  @MessagePattern('MCPsearchProducts')
  searchProducts(@Payload() toolCallRequestDto: ToolCallRequestDto) {
    return this.productsService.searchProducts(toolCallRequestDto);
  }
}
