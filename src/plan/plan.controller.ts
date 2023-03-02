import {
  Body,
  Controller,
  Get,
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
import { AddPlanDto } from './dto/add-plan.dto';
import { PlanService } from './plan.service';

@ApiTags('Plan API')
@Controller()
export class PlanController {
  constructor(private planService: PlanService) {}

  @UseGuards(AuthGuard)
  @Get('trip/:tripId/plan')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '일정 목록 조회',
    description: '일정 목록 조회 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  getList(
    @Param('tripId', ParseIntPipe) tripId: number,
    @User('userId', ParseIntPipe) userId: number,
  ) {
    return this.planService.getList(tripId, userId);
  }

  @UseGuards(AuthGuard)
  @Post('trip/:tripId/plan')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '일정 추가',
    description: '일정 추가 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  addPlan(
    @Param('tripId', ParseIntPipe) tripId: number,
    @User('userId', ParseIntPipe) userId: number,
    @Body() addPlanDto: AddPlanDto,
  ) {
    return this.planService.addPlan(tripId, userId, addPlanDto);
  }
}
