import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtVerifyOptions } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  sign(id: string) {
    try {
      const token = this.jwtService.sign(id);
      return token;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  verify(token: string, key?: string, options?: JwtVerifyOptions) {
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      if (key) {
        const payload = this.jwtService.verify(token, {
          secret: key,
          ...options,
        });
        return payload;
      }
      const payload = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
        ...options,
      });
      return payload;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
