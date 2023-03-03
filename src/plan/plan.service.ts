import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Trip } from 'src/trip/trip.entity';
import { Repository } from 'typeorm';
import { AddPlanDto } from './dto/add-plan.dto';
import { UpdateCheckedDto } from './dto/checked-change';
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

  async getList(tripId: number, userId: number): Promise<PlanDto[]> {
    const trip = await this.tripRepository.findOne({ id: tripId });
    if (trip.userId !== userId) {
      throw new UnauthorizedException();
    }
    const plans = await this.planRepository.find({
      tripId: tripId,
    });
    const planList = plainToInstance(PlanDto, plans);
    const sortedPlan = planList.sort(
      (a, b) => new Date(a.time).valueOf() - new Date(b.time).valueOf(),
    );

    return sortedPlan;
  }

  async addPlan(tripId: number, userId: number, addPlanData: AddPlanDto) {
    const trip = await this.tripRepository.findOne({ id: tripId });

    if (!trip) {
      throw new NotFoundException();
    }

    if (trip.userId !== userId) {
      throw new UnauthorizedException();
    }

    const plan = new Plan();
    plan.day = addPlanData.day;
    plan.content = addPlanData.content;
    plan.time = addPlanData.time;
    plan.checked = addPlanData.checked;
    plan.userId = userId;
    plan.tripId = tripId;
    if (addPlanData.coordinate) {
      plan.coordinate = addPlanData.coordinate;
    }

    await this.planRepository.save(plan);

    const planData = plainToInstance(PlanDto, plan);

    return planData;
  }

  async updateChecked(
    planId: number,
    userId: number,
    checkedData: UpdateCheckedDto,
  ): Promise<PlanDto> {
    const plan = await this.planRepository.findOne({ id: planId });

    if (!plan) {
      throw new NotFoundException();
    }
    if (plan.userId !== userId) {
      throw new UnauthorizedException();
    }

    plan.checked = checkedData.checked;

    await this.planRepository.save(plan);

    const planData = plainToInstance(PlanDto, plan);

    return planData;
  }
}
