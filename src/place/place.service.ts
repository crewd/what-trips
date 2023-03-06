import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
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

  async getPlaceList(tripId: number, userId: number): Promise<PlaceDto[]> {
    const trip = await this.tripRepository.findOne({ id: tripId });

    if (!trip) {
      throw new NotFoundException();
    }

    if (trip.userId !== userId) {
      throw new UnauthorizedException();
    }

    const places = await this.placeRepository.find({ tripId: tripId });
    const placeList = plainToInstance(PlaceDto, places);

    return placeList;
  }

  async deletePlace(placeId: number, userId: number): Promise<void> {
    const place = await this.placeRepository.findOne({ id: placeId });

    if (!place) {
      throw new NotFoundException();
    }

    if (place.userId !== userId) {
      throw new UnauthorizedException();
    }

    await this.placeRepository.delete({ id: placeId });
  }
}
