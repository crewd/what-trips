import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlanDto {
  @Expose()
  id: number;

  @Expose()
  day: number;

  @Expose()
  content: string;

  @Expose()
  time: string;

  @Expose()
  checked: boolean;

  @Expose()
  coordinate: string;
}
