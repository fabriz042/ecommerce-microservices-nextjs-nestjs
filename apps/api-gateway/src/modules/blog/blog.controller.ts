import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';

@Controller('blog')
export class BlogController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.client.send('createBlog', createBlogDto);
  }

  @Get()
  findAll() {
    return this.client.send('findAllBlog', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findBlog', { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.client.send('updateBlog', { id, updateBlogDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('deleteBlog', { id });
  }
}
