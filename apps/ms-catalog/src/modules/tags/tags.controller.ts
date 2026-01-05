import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto, UpdateTagsDto } from "@packages/shared-back";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller()
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    //---------------------------------------------------------------
    // PUBLIC METHODS
    //---------------------------------------------------------------
    @MessagePattern('findAllTags')
    findAll() {
        return this.tagsService.findAll();
    }

    //---------------------------------------------------------------
    // ADMIN METHODS
    //---------------------------------------------------------------
    @MessagePattern('adminFindAllTags')
    adminFindAll(@Payload() filterDto: FilterDto) {
        return this.tagsService.adminFindAll(filterDto);
    }

    @MessagePattern('adminFindOneTags')
    adminFindOne(@Payload('id', ParseUUIDPipe) id: string) {
        return this.tagsService.adminFindOne(id);
    }

    @MessagePattern('adminCreateTags')
    adminCreate(@Payload() createTagsDto: CreateTagsDto) {
        return this.tagsService.adminCreate(createTagsDto);
    }

    @MessagePattern('adminUpdateTags')
    adminUpdate(@Payload() payload: any) {
        const { id, ...updateTagsDto } = payload;
        return this.tagsService.adminUpdate(id, updateTagsDto);
    }

    @MessagePattern('adminRemoveTags')
    adminRemove(@Payload('id', ParseUUIDPipe) id: string) {
        return this.tagsService.adminRemove(id);
    }
}
