import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CacheModule } from './modules/cache/cache.module';
import { CoursesModule } from './modules/courses/courses.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import * as Joi from 'joi';
import { dataSourceOptions } from './config/data-source';
import { User } from './entities/user.entity';
import { Gym } from './entities/gym.entity';
import { Course } from './entities/course.entity';
import { Exercise } from './entities/exercise.entity';
import { Training } from './entities/training.entity';
import { Nutrition } from './entities/nutrition.entity';
import { Promotion } from './entities/promotion.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().default('1d'),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().default('7d'),
      }),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    CacheModule,
    CoursesModule,
    WorkoutsModule,
  ],
  providers: [],
})
export class AppModule {}
