import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { DatabaseService } from 'src/common/database.service';

@Injectable()
export class StatusService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    return this.db.status.findMany();
  }

  async findOne(id: string) {
    const status = await this.db.status.findUnique({ where: { id } });
    if (!status) {
      throw new RpcException({
        status: 404,
        message: `Status ID ${id} not found`,
      });
    }
    return status;
  }

  create(createStatusDto: CreateStatusDto) {
    return this.db.status.create({ data: createStatusDto });
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {
    await this.findOne(id);
    return this.db.status.update({
      where: { id },
      data: updateStatusDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.status.delete({ where: { id } });
  }
}
