import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateTripDto {
  /**
   * 수정할 게시글의 제목
   * @example 'post_title'
   */
  @IsString()
  title: string;

  /**
   * 수정할 여행 시작 날짜
   * @example '2023/02/15'
   */
  @IsDate()
  startTime: string;

  /**
   * 수정할 여행 종료 날짜
   * @example '2023/02/18'
   */
  @IsDate()
  endTime: string;
}
