import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
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

  @Post('signup')
  @ApiOperation({ summary: '회원가입', description: '유저 회원가입 API' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @ApiResponse({ status: 409, description: 'ConflictException' })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }
}
