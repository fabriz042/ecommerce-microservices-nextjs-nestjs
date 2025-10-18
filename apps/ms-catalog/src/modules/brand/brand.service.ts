import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { DatabaseService } from 'src/common/database.service';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';

@Injectable()
export class BrandService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    return this.db.brand.findMany();
  }

  async findOne(id: string) {
    const brand = await this.db.brand.findUnique({ where: { id } });
    if (!brand) {
      throw new RpcException({
        status: 400,
        message: `Brand ID ${id} not found`,
      });
    }
    return brand;
  }

  create(createBrandDto: CreateBrandDto) {
    return this.db.brand.create({ data: createBrandDto });
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.findOne(id);
    return this.db.brand.update({ where: { id }, data: updateBrandDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    const products = await this.db.product.findMany({ where: { brandId: id } });
    if (products.length > 0) {
      throw new RpcException({
        status: 400,
        message: `Brand ID ${id} has associated products`,
      });
    }
    return this.db.brand.delete({ where: { id } });
  }
}
