import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TripDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  startTime: string;

  @Expose()
  endTime: string;
}
