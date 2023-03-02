import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TripController } from './trip.controller';
import { Trip } from './trip.entity';
import { TripService } from './trip.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), TypeOrmModule.forFeature([User])],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
