import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CacheModule } from './modules/cache/cache.module';
import { CoursesModule } from './modules/courses/courses.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import { ConfigModule } from './config/config.module';
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
    ConfigModule,
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
