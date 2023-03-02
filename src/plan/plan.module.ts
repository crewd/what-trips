import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [],
  providers: [],
})
export class TripModule {}
