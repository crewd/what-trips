import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/trip/trip.entity';
import { Repository } from 'typeorm';
import { AddPlaceDto } from './dto/add-place.dto';
import { PlaceDto } from './dto/place.dto';
import { Place } from './place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,

    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async addPlace(
    tripId: number,
    userId: number,
    placeData: AddPlaceDto,
  ): Promise<void> {
    const trip = await this.tripRepository.findOne({ id: tripId });

    if (!trip) {
      throw new NotFoundException();
    }

    if (trip.userId !== userId) {
      throw new UnauthorizedException();
    }

    const place = new Place();
    place.name = placeData.name;
    place.day = placeData.day;
    place.time = placeData.time;
    place.coordinate = placeData.coordinate;

    await this.placeRepository.save(place);
  }
}
