import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.decorator';
import { TripService } from './trip.service';

@ApiTags('Trip API')
@Controller('trip')
export class TripController {
  constructor(private tripService: TripService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '여행 목록 조회',
    description: '여행 목록 조회 API',
  })
  getList(@User('userId', ParseIntPipe) userId: number) {
    return this.tripService.getList(userId);
  }
}
