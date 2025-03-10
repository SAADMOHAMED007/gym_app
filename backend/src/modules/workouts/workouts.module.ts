import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout, WorkoutExercise, ExerciseSet, Exercise } from '../../entities';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workout, WorkoutExercise, ExerciseSet, Exercise]),
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {} 