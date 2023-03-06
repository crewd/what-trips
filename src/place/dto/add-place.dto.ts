import { IsNumber, IsString } from 'class-validator';

export class AddPlaceDto {
  /**
   * 생성할 장소명
   * @example "김포공항"
   */
  @IsString()
  name: string;

  /**
   * 생성할 장소의 일차
   * @example 1
   */
  @IsNumber()
  day: number;

  /**
   * 생성할 장소의 시간
   * @example "09:00"
   */
  @IsString()
  time: string;

  /**
   * 생성할 장소의 좌표값
   * @example "place_coordinate"
   */
  @IsString()
  coordinate: string;
}
