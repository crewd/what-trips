import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { AddTripDto } from './dto/add-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripService } from './trip.service';

@ApiTags('Trip API')
@Controller('trip')
export class TripController {
  constructor(private tripService: TripService) {}

  @UseGuards(AuthGuard)
  @Get('list')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '여행 목록 조회',
    description: '여행 목록 조회 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  getList(@User('userId', ParseIntPipe) userId: number) {
    return this.tripService.getList(userId);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '여행 추가',
    description: '여행 추가 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  addTrip(
    @User('userId', ParseIntPipe) userId: number,
    @Body() addTripDto: AddTripDto,
  ) {
    return this.tripService.addTrip(addTripDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get(':tripId/plan')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '여행 상세',
    description: '여행 상세 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  detailTrip(
    @User('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
  ) {
    return this.tripService.detailTrip(tripId, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':tripId')
  @ApiOperation({
    summary: '여행 수정',
    description: '여행 수정 API',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  updateTrip(
    @User('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() updateTrip: UpdateTripDto,
  ) {
    return this.tripService.updateTrip(tripId, updateTrip, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':tripId')
  @ApiOperation({
    summary: '여행 삭제',
    description: '여행 삭제 API',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 404, description: 'NotFoundException' })
  deleteTrip(
    @User('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
  ) {
    return this.tripService.deleteTrip(tripId, userId);
  }
}
