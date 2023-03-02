import { IsString } from 'class-validator';

export class AddTripDto {
  /**
   * 생성할 여행의 이름
   * @example '제주도 여행'
   */
  @IsString()
  title: string;

  /**
   * 여행 시작 날짜
   * @example '2023/02/15'
   */
  @IsString()
  startTime: string;

  /**
   * 여행 종료 날짜
   * @example '2023/02/18'
   */
  @IsString()
  endTime: string;
}
