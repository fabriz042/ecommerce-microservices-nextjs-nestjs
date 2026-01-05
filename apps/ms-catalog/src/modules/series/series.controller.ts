import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto, UpdateSeriesDto } from "@packages/shared-back";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller()
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) { }

  //---------------------------------------------------------------
  // PUBLIC METHODS
  //---------------------------------------------------------------
  @MessagePattern('findAllSeries')
  findAll() {
    return this.seriesService.findAll();
  }

  //---------------------------------------------------------------
  // ADMIN METHODS
  //---------------------------------------------------------------
  @MessagePattern('adminFindAllSeries')
  adminFindAll(@Payload() filterDto: FilterDto) {
    return this.seriesService.adminFindAll(filterDto);
  }

  @MessagePattern('adminFindOneSeries')
  adminFindOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.seriesService.adminFindOne(id);
  }

  @MessagePattern('adminCreateSeries')
  adminCreate(@Payload() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.adminCreate(createSeriesDto);
  }

  @MessagePattern('adminUpdateSeries')
  adminUpdate(@Payload() payload: any) {
    const { id, ...updateSeriesDto } = payload;
    return this.seriesService.adminUpdate(id, updateSeriesDto);
  }

  @MessagePattern('adminRemoveSeries')
  adminRemove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.seriesService.adminRemove(id);
  }
}
