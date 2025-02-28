import { DynamicModule, ModuleMetadata, Provider, Type } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  TEST_CONFIG_MODULE_OPTIONS, 
  TEST_DATABASE_CONFIG 
} from './test.config';

export interface TestModuleOptions extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  controllers?: Type<any>[];
  mockProviders?: Provider[];
  overrideProviders?: [Type<any>, Partial<Record<keyof any, jest.Mock>>][];
}

export class TestModuleFactory {
  static async create(options: TestModuleOptions = {}): Promise<TestingModule> {
    const { 
      imports = [], 
      providers = [], 
      controllers = [], 
      mockProviders = [],
      overrideProviders = [],
    } = options;

    const builder = await this.createTestingModuleBuilder({
      imports: [
        ConfigModule.forRoot(TEST_CONFIG_MODULE_OPTIONS),
        TypeOrmModule.forRoot(TEST_DATABASE_CONFIG),
        ...imports,
      ],
      controllers,
      providers: [...providers, ...mockProviders],
    });

    // Apply provider overrides
    overrideProviders.forEach(([provider, mockImplementation]) => {
      builder.overrideProvider(provider).useValue(mockImplementation);
    });

    return builder.compile();
  }

  static async createTestingModuleBuilder(
    metadata: ModuleMetadata,
  ): Promise<TestingModuleBuilder> {
    return Test.createTestingModule(metadata);
  }

  static getProviderMock<T extends object>(
    type: Type<T>,
    methodNames: Array<keyof T>,
  ): jest.Mocked<T> {
    const mock = {} as jest.Mocked<T>;
    methodNames.forEach(methodName => {
      mock[methodName] = jest.fn() as any;
    });
    return mock;
  }

  static createMockRepository<T = any>() {
    return {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      remove: jest.fn(),
      count: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
        getOne: jest.fn(),
        getManyAndCount: jest.fn(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
      })),
    };
  }

  static async createTestingApp(module: TestingModule) {
    const app = module.createNestApplication();
    await app.init();
    return app;
  }

  static async cleanupTestingApp(app: any) {
    if (app) {
      await app.close();
    }
  }
}
