import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/trip/trip.entity';
import { PlanController } from './plan.controller';
import { Plan } from './plan.entity';
import { PlanService } from './plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), TypeOrmModule.forFeature([Trip])],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
