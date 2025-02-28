import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AppConfigModule } from './config/app.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { User } from './entities/user.entity';
import { Gym } from './entities/gym.entity';
import { Course } from './entities/course.entity';
import { Exercise } from './entities/exercise.entity';
import { Training } from './entities/training.entity';
import { Nutrition } from './entities/nutrition.entity';
import { Promotion } from './entities/promotion.entity';

@Module({
  imports: [
    AppConfigModule,
    
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.database.host,
        port: configService.database.port,
        username: configService.database.username,
        password: configService.database.password,
        database: configService.database.database,
        entities: [User, Gym, Course, Exercise, Training, Nutrition, Promotion],
        synchronize: configService.isDevelopment,
        logging: configService.isDevelopment,
      }),
      inject: [ConfigService],
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [AppConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.cache.ttl,
        max: configService.cache.max,
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
