import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.decorator';
import { AddTripDto } from './dto/add-trip.dto';
import { TripService } from './trip.service';

@ApiTags('Trip API')
@Controller('trip')
export class TripController {
  constructor(private tripService: TripService) {}

  @Get('list')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '여행 목록 조회',
    description: '여행 목록 조회 API',
  })
  getList(@User('userId', ParseIntPipe) userId: number) {
    return this.tripService.getList(userId);
  }

  @Post('add')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '여행 추가',
    description: '여행 추가 API',
  })
  addTrip(
    @User('userId', ParseIntPipe) userId: number,
    @Body() addTripDto: AddTripDto,
  ) {
    return this.tripService.addTrip(addTripDto, userId);
  }

  @Get(':tripId/plan')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '여행 상세',
    description: '여행 상세 API',
  })
  detailTrip(
    @User('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
  ) {
    return this.tripService.detailTrip(tripId, userId);
  }
}
