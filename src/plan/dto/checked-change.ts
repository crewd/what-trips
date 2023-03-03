import { IsBoolean } from 'class-validator';

export class UpdateCheckedDto {
  /**
   * 변경할 체크 여부
   * @example true
   */
  @IsBoolean()
  checked: boolean;
}
