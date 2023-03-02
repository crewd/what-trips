import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Trip } from 'src/trip/trip.entity';
import { Repository } from 'typeorm';
import { PlanDto } from './dto/plan.dto';
import { Plan } from './plan.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,

    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async planList(tripId: number): Promise<PlanDto[]> {
    const plans = await this.planRepository.find({ tripId: tripId });
    const planList = plainToInstance(PlanDto, plans);
    const sortedPlan = planList.sort(
      (a, b) => new Date(a.time).valueOf() - new Date(b.time).valueOf(),
    );

    return sortedPlan;
  }
}
