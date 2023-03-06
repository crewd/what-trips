import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlaceDto {
  @Expose()
  name: string;

  @Expose()
  day: number;

  @Expose()
  time: string;

  @Expose()
  coordinate: string;
}
