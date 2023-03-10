import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { LoginResultDto } from './dto/login-result.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private authService: AuthService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResultDto> {
    const checkedUser = await this.userRepository.findOne({
      email: loginDto.email,
    });

    if (!checkedUser) {
      throw new UnauthorizedException();
    }
    const checkPassword = await compare(
      loginDto.password,
      checkedUser.password,
    );

    if (!checkPassword) {
      throw new UnauthorizedException();
    }

    const userToken = this.authService.sign(checkedUser.id.toString());

    return {
      token: userToken,
      email: checkedUser.email,
      name: checkedUser.name,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const checkedEmail = await this.userRepository.findOne({
      email: signUpDto.email,
    });

    if (checkedEmail) {
      throw new ConflictException();
    }
    const hashPassword = await hash(
      signUpDto.password,
      Number(process.env.SALT_ROUNDS),
    );
    const user = new User();
    user.email = signUpDto.email;
    user.name = signUpDto.name;
    user.password = hashPassword;

    await this.userRepository.save(user);
  }
}
