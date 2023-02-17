import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TripListDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  startTime: Date;

  @Expose()
  endTime: Date;
}
