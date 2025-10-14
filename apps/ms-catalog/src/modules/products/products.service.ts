import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '../../../generated/prisma';
import { RpcNotFound } from '@packages/shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('____________Products connected to the database');
  }

  //Get all
  findAll() {
    return this.product.findMany({
      select: {
        name: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  //Get one
  async findOne(id: string) {
    const product = await this.product.findFirst({
      where: { id },
    });

    if (!product) throw RpcNotFound(`Product ${id} not found`);
    return product;
  }

  //Create
  async create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  //Update
  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    const updatedProduct = await this.product.update({
      where: { id },
      data: updateProductDto,
    });

    return updatedProduct;
  }

  //Delete
  async remove(id: string) {
    await this.findOne(id);
    return this.product.delete({ where: { id } });
  }

  //Validate products
  async validateProduct(ids: string[]) {
    this.logger.log(`Received: ${JSON.stringify(ids)}`);
    ids = Array.from(new Set(ids));
    const products = await this.product.findMany({
      where: {
        id: { in: ids },
      },
    });

     this.logger.log(`Found products: ${JSON.stringify(products)}`); 

    if (products.length !== ids.length)
      throw new RpcException({ message: 'Some products not found', status: HttpStatus.BAD_REQUEST });

    return products;
  }
}