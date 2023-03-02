import { Controller, Get, ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { PlanService } from './plan.service';

@ApiTags('Prip API')
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
  getList(@User('userId', ParseIntPipe) userId: number) {
    return this.planService.planList(userId);
  }
}
