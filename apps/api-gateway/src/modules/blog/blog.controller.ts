import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('blog')
export class BlogController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.client.send('createBlog', createBlogDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('findAllBlog', paginationDto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.client.send('findOneBlog', slug);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.client.send('updateBlog', { id, ...updateBlogDto });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('deleteBlog', { id });
  }
}
