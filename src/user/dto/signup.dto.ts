import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  /**
   * 가입할 유저의 이메일
   * @example 'example@gmail.com'
   */
  @IsEmail()
  email: string;

  /**
   * 가입할 유저의 이름
   * @example '홍길동'
   */
  @IsString()
  name: string;

  /**
   * 가입할 유저의 비밀번호
   * @example 'user_password'
   */
  @IsString()
  password: string;
}
