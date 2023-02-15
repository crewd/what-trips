import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인', description: '유저 로그인 API' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
