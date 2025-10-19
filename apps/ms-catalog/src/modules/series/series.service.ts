import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { DatabaseService } from 'src/common/database.service';

@Injectable()
export class SeriesService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    return this.db.series.findMany();
  }

  async findOne(id: string) {
    const series = await this.db.series.findUnique({ where: { id } });
    if (!series) {
      throw new RpcException({
        status: 404,
        message: `Series ID ${id} not found`,
      });
    }
    return series;
  }

  create(createSeriesDto: CreateSeriesDto) {
    return this.db.series.create({ data: createSeriesDto });
  }

  async update(id: string, updateSeriesDto: UpdateSeriesDto) {
    await this.findOne(id);

    const updatedSeries = await this.db.series.update({
      where: { id },
      data: updateSeriesDto,
    });
    return updatedSeries;
  }

  async remove(id: string) {
    const relatedProducts = await this.db.product.findMany({
      where: { seriesId: id },
    });
    if (relatedProducts)
      throw new RpcException({
        status: 409,
        message: `There are products related to this series`,
      });

    await this.findOne(id);

    return this.db.series.delete({ where: { id } });
  }
}
