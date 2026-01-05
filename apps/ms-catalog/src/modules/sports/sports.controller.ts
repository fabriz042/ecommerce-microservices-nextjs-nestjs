import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { SportsService } from './sports.service';
import { CreateSportsDto, UpdateSportsDto } from "@packages/shared-back";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterDto } from '@/common/dtos/filter.dtos';

@Controller()
export class SportsController {
    constructor(private readonly sportsService: SportsService) { }

    //---------------------------------------------------------------
    // PUBLIC METHODS
    //---------------------------------------------------------------
    @MessagePattern('findAllSports')
    findAll() {
        return this.sportsService.findAll();
    }

    //---------------------------------------------------------------
    // ADMIN METHODS
    //---------------------------------------------------------------
    @MessagePattern('adminFindAllSports')
    adminFindAll(@Payload() filterDto: FilterDto) {
        return this.sportsService.adminFindAll(filterDto);
    }

    @MessagePattern('adminFindOneSports')
    adminFindOne(@Payload('id', ParseUUIDPipe) id: string) {
        return this.sportsService.adminFindOne(id);
    }

    @MessagePattern('adminCreateSports')
    adminCreate(@Payload() createSportsDto: CreateSportsDto) {
        return this.sportsService.adminCreate(createSportsDto);
    }

    @MessagePattern('adminUpdateSports')
    adminUpdate(@Payload() payload: any) {
        const { id, ...updateSportsDto } = payload;
        return this.sportsService.adminUpdate(id, updateSportsDto);
    }

    @MessagePattern('adminRemoveSports')
    adminRemove(@Payload('id', ParseUUIDPipe) id: string) {
        return this.sportsService.adminRemove(id);
    }
}
