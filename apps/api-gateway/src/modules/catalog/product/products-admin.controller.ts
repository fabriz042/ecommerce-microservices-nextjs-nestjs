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
import { CreateProductDto, UpdateProductDto } from "@packages/shared-back";
import { NATS_SERVICE } from '@/config/services';
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller('admin/products')
// @UseGuards(AuthGuard)
export class ProductsAdminController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    @Get()
    findAllProductsAdmin(@Query() filterDto: FilterDto) {
        return this.client.send('AdminfindAllProducts', filterDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.client.send('AdminfindOneProduct', { id });
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.client.send('createProduct', createProductDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.client.send('updateProduct', { ...updateProductDto, id });
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.client.send('removeProduct', { id });
    }
}