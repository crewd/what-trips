import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { TripListDto } from './dto/trips-list.dto';
import { Trip } from './trip.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getList(): Promise<TripListDto[]> {
    const trips = await this.tripRepository.find();
    const tripList = plainToInstance(TripListDto, trips);
    return tripList;
  }
}
