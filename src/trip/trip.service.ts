import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AddTripDto } from './dto/add-trip.dto';
import { TripDto } from './dto/trip.dto';
import { Trip } from './trip.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getList(userId: number): Promise<TripDto[]> {
    const trips = await this.tripRepository.find({ userId: userId });
    const tripList = plainToInstance(TripDto, trips);
    return tripList;
  }

  async addTrip(addTripData: AddTripDto, userId: number): Promise<TripDto> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new UnauthorizedException();
    }
    const trip = new Trip();
    trip.title = addTripData.title;
    trip.userId = userId;
    trip.startTime = addTripData.startTime;
    trip.endTime = addTripData.endTime;

    await this.tripRepository.save(trip);

    const tripData = plainToInstance(TripDto, trip);

    return tripData;
  }

  async detailTrip(tripId: number, userId: number): Promise<TripDto> {
    const trip = await this.tripRepository.findOne({ id: tripId });

    if (trip.userId !== userId) {
      throw new UnauthorizedException();
    }

    if (!trip) {
      throw new NotFoundException();
    }

    const tripData = plainToInstance(TripDto, trip);

    return tripData;
  }

  async deleteTrip(tripId: number, userId: number): Promise<void> {
    const trip = await this.tripRepository.findOne({ id: tripId });
    if (!trip) {
      throw new NotFoundException();
    }

    if (trip.userId !== userId) {
      throw new UnauthorizedException();
    }
    await this.tripRepository.delete({ id: tripId });
  }
}
