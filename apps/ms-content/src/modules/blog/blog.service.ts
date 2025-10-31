import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { DatabaseService } from 'src/common/database.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';

@Injectable()
export class BlogService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(paginationDto: PaginationDto) {
    const page = paginationDto.page ?? 1;
    const per_page = Math.min(paginationDto.per_page ?? 10, 100);

    const total_items = await this.db.blog.count();

    const blogs = await this.db.blog.findMany({
      skip: (page - 1) * per_page,
      take: per_page,
    });

    return {
      meta: {
        total_items: total_items,
        current_page: page,
        per_page: per_page,
        total_pages: Math.ceil(total_items / per_page),
      },
      data: blogs,
    };
  }

  async findOne(slug: string) {
    const blog = await this.db.blog.findUnique({ where: { slug } });
    if (!blog) {
      throw new RpcException({
        status: 404,
        message: `Blog ${slug} not found`,
      });
    }
    return blog;
  }

  create(createBlogDto: CreateBlogDto) {
    return this.db.blog.create({ data: createBlogDto });
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    this.db.blog.findUnique({ where: { id } });
    return this.db.blog.update({ where: { id }, data: updateBlogDto });
  }

  remove(id: string) {
    this.db.blog.findUnique({ where: { id } });
    return this.db.blog.delete({ where: { id } });
  }
}
