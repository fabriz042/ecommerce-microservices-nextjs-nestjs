import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @MessagePattern('createSeries')
  create(@Payload() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }

  @MessagePattern('findAllSeries')
  findAll() {
    return this.seriesService.findAll();
  }

  @MessagePattern('findOneSeries')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.seriesService.findOne(id);
  }

  @MessagePattern('updateSeries')
  update(@Payload() updateSeriesDto: UpdateSeriesDto) {
    return this.seriesService.update(updateSeriesDto.id, updateSeriesDto);
  }

  @MessagePattern('removeSeries')
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.seriesService.remove(id);
  }
}
