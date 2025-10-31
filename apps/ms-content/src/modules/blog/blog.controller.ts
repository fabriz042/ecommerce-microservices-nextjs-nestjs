import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @MessagePattern('findAllBlog')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.blogService.findAll(paginationDto);
  }

  @MessagePattern('findOneBlog')
  findOne(@Payload() slug: string) {
    return this.blogService.findOne(slug);
  }

  @MessagePattern('createBlog')
  create(@Payload() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @MessagePattern('updateBlog')
  update(@Payload() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(updateBlogDto.id, updateBlogDto);
  }

  @MessagePattern('removeBlog')
  remove(@Payload() id: string) {
    return this.blogService.remove(id);
  }
}
