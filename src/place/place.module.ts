import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/trip/trip.entity';
import { Place } from './place.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    TypeOrmModule.forFeature([Trip]),
  ],
  controllers: [],
  providers: [],
})
export class PlaceModule {}
