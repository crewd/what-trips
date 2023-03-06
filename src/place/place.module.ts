import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/trip/trip.entity';
import { PlaceController } from './place.controller';
import { Place } from './place.entity';
import { PlaceService } from './place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    TypeOrmModule.forFeature([Trip]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
