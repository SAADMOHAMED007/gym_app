import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from './config.service';
import * as dotenv from 'dotenv';
import { User } from '../entities/user.entity';
import { Gym } from '../entities/gym.entity';
import { Training } from '../entities/training.entity';
import { Course } from '../entities/course.entity';
import { Exercise } from '../entities/exercise.entity';
import { Nutrition } from '../entities/nutrition.entity';
import { Promotion } from '../entities/promotion.entity';
import { Workout } from '../entities/workout.entity';
import { WorkoutExercise } from '../entities/workout-exercise.entity';
import { ExerciseSet } from '../entities/exercise-set.entity';

dotenv.config();

import { ConfigService as NestConfigService } from '@nestjs/config';

const nestConfigService = new NestConfigService();
const configService = new ConfigService(nestConfigService);

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'gym_app',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  url: process.env.DATABASE_URL || '', // Just to avoid validation errors
  };

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;