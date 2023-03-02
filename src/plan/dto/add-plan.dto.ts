import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddPlanDto {
  /**
   * 생성할 일정의 일차
   * @example 1
   */
  @IsNumber()
  day: number;

  /**
   * 생성할 일정의 내용
   * @example "김포공항 도착"
   */
  @IsString()
  content: string;

  /**
   * 생성할 일정의 시간
   * @example "09:00"
   */
  @IsString()
  time: string;

  /**
   * 생성할 일정의 체크 여부
   * @example true
   */
  @IsBoolean()
  checked: boolean;

  /**
   * 생성할 일정의 장소 좌표
   * @example "place_coordinate"
   */
  @IsOptional()
  @IsString()
  coordinate?: string;
}
