import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { AddPlaceDto } from './dto/add-place.dto';
import { PlaceService } from './place.service';

@ApiTags('Place API')
@Controller()
export class PlanController {
  constructor(private placeService: PlaceService) {}

  @UseGuards(AuthGuard)
  @Post('trip/:tripId/place')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '장소 추가',
    description: '장소 추가 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 403, description: 'NotFoundException' })
  addPlan(
    @Param('tripId', ParseIntPipe) tripId: number,
    @User('userId', ParseIntPipe) userId: number,
    @Body() addPlaceDto: AddPlaceDto,
  ) {
    return this.placeService.addPlace(tripId, userId, addPlaceDto);
  }
}
