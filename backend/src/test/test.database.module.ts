import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestDatabaseService } from './test.database';
import { User } from '../entities/user.entity';
import { Gym } from '../entities/gym.entity';
import { Course } from '../entities/course.entity';
import { Exercise } from '../entities/exercise.entity';
import { Training } from '../entities/training.entity';
import { Nutrition } from '../entities/nutrition.entity';
import { Promotion } from '../entities/promotion.entity';
import { TEST_DATABASE_CONFIG } from './test.config';

const entities = [
  User,
  Gym,
  Course,
  Exercise,
  Training,
  Nutrition,
  Promotion,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(TEST_DATABASE_CONFIG),
    TypeOrmModule.forFeature(entities),
    ConfigModule,
  ],
  providers: [
    {
      provide: TestDatabaseService,
      useFactory: async (configService: ConfigService) => {
        const service = new TestDatabaseService();
        await service.onModuleInit();
        return service;
      },
      inject: [ConfigService],
    },
  ],
  exports: [TestDatabaseService, TypeOrmModule],
})
export class TestDatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: TestDatabaseModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        {
          provide: TestDatabaseService,
          useFactory: async (configService: ConfigService) => {
            const service = new TestDatabaseService();
            await service.onModuleInit();
            return service;
          },
          inject: [ConfigService],
        },
      ],
      exports: [TestDatabaseService],
    };
  }

  static forFeature(customEntities: any[] = []): DynamicModule {
    return {
      module: TestDatabaseModule,
      imports: [TypeOrmModule.forFeature([...entities, ...customEntities])],
      exports: [TypeOrmModule],
    };
  }

  static forRepository(entity: any): DynamicModule {
    return {
      module: TestDatabaseModule,
      imports: [TypeOrmModule.forFeature([entity])],
      exports: [TypeOrmModule],
    };
  }

  static async forTest(): Promise<DynamicModule> {
    const databaseProvider: Provider = {
      provide: TestDatabaseService,
      useFactory: async () => {
        const service = new TestDatabaseService();
        await service.onModuleInit();
        return service;
      },
    };

    return {
      module: TestDatabaseModule,
      imports: [
        TypeOrmModule.forRoot(TEST_DATABASE_CONFIG),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [databaseProvider],
      exports: [databaseProvider, TypeOrmModule],
      global: true,
    };
  }

  constructor(private readonly databaseService: TestDatabaseService) {}

  async onModuleDestroy() {
    await this.databaseService.onModuleDestroy();
  }
}
