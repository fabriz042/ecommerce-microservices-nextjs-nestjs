import { Controller, ParseUUIDPipe, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ToolCallRequestDto } from "@packages/shared-back"
import { PaginationDto, } from '@/common/dtos/pagination.dto';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------

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
  findOne(@Payload('slug') slug: string) {
    return this.productsService.findOne(slug);
  }

  //Get recommendations
  @MessagePattern('findRecommendations')
  findRecommendations(@Payload('id', ParseUUIDPipe) id: string) {
    return this.productsService.findRecommendations(id);
  }

  //Update
  @MessagePattern('updateProduct')
  update(@Payload() payload: any) {
    const { id, ...updateProductDto } = payload;
    return this.productsService.update(id, updateProductDto);
  }

  //Delete
  @MessagePattern('removeProduct')
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }

  //---------------------------------------------------------------
  // ADMIN METHODS
  //---------------------------------------------------------------

  //Admin - Get All
  @MessagePattern('AdminfindAllProducts')
  AdminfindAll(@Payload() filterDto: FilterDto) {
    return this.productsService.AdminfindAll(filterDto);
  }

  //---------------------------------------------------------------
  //Admin - Get One
  @MessagePattern('AdminfindOneProduct')
  AdminfindOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.productsService.AdminfindOne(id);
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
