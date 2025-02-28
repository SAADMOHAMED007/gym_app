import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { TestDatabaseService } from './test.database';
import { TestFactory } from './test.factory';
import { ConfigService } from '../config/config.service';
import { AppModule } from '../app.module';
import { TEST_DATABASE_CONFIG } from './test.config';

export class TestBase {
  protected app: INestApplication;
  protected module: TestingModule;
  protected connection: Connection;
  protected databaseService: TestDatabaseService;
  protected configService: ConfigService;

  async beforeAll() {
    // Create the test module
    this.module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Connection)
      .useValue(TEST_DATABASE_CONFIG)
      .compile();

    // Create the application instance
    this.app = this.module.createNestApplication();
    await this.app.init();

    // Get required services
    this.databaseService = this.module.get<TestDatabaseService>(TestDatabaseService);
    this.configService = this.module.get<ConfigService>(ConfigService);
    this.connection = this.databaseService.getDataSource();
  }

  async afterAll() {
    await this.databaseService.cleanDatabase();
    await this.app.close();
  }

  async beforeEach() {
    await this.databaseService.clearAllTables();
  }

  // Helper methods for creating test data
  protected async createTestUser(override = {}) {
    return this.databaseService.createTestData(
      'User',
      TestFactory.createUser(override),
    );
  }

  protected async createTestGym(override = {}) {
    return this.databaseService.createTestData(
      'Gym',
      TestFactory.createGym(override),
    );
  }

  protected async createTestCourse(override = {}) {
    return this.databaseService.createTestData(
      'Course',
      TestFactory.createCourse(override),
    );
  }

  protected async createTestExercise(override = {}) {
    return this.databaseService.createTestData(
      'Exercise',
      TestFactory.createExercise(override),
    );
  }

  protected async createTestTraining(override = {}) {
    return this.databaseService.createTestData(
      'Training',
      TestFactory.createTraining(override),
    );
  }

  protected async createTestNutrition(override = {}) {
    return this.databaseService.createTestData(
      'Nutrition',
      TestFactory.createNutrition(override),
    );
  }

  protected async createTestPromotion(override = {}) {
    return this.databaseService.createTestData(
      'Promotion',
      TestFactory.createPromotion(override),
    );
  }

  // Helper methods for creating multiple test entities
  protected async createTestUsers(count: number, override = {}) {
    return this.databaseService.createTestDataInBulk(
      'User',
      TestFactory.createMany(TestFactory.createUser, count, override),
    );
  }

  protected async createTestGyms(count: number, override = {}) {
    return this.databaseService.createTestDataInBulk(
      'Gym',
      TestFactory.createMany(TestFactory.createGym, count, override),
    );
  }

  protected async createTestCourses(count: number, override = {}) {
    return this.databaseService.createTestDataInBulk(
      'Course',
      TestFactory.createMany(TestFactory.createCourse, count, override),
    );
  }

  protected async createTestExercises(count: number, override = {}) {
    return this.databaseService.createTestDataInBulk(
      'Exercise',
      TestFactory.createMany(TestFactory.createExercise, count, override),
    );
  }

  protected async createTestTrainings(count: number, override = {}) {
    return this.databaseService.createTestDataInBulk(
      'Training',
      TestFactory.createMany(TestFactory.createTraining, count, override),
    );
  }

  protected async createTestNutritions(count: number, override = {}) {
    return this.databaseService.createTestDataInBulk(
      'Nutrition',
      TestFactory.createMany(TestFactory.createNutrition, count, override),
    );
  }

  protected async createTestPromotions(count: number, override = {}) {
    return this.databaseService.createTestDataInBulk(
      'Promotion',
      TestFactory.createMany(TestFactory.createPromotion, count, override),
    );
  }

  // Helper methods for test assertions
  protected async expectEntityCount(entity: string, count: number) {
    const actualCount = await this.connection
      .getRepository(entity)
      .count();
    expect(actualCount).toBe(count);
  }

  protected async expectEntityExists(entity: string, criteria: object) {
    const exists = await this.connection
      .getRepository(entity)
      .findOne({ where: criteria });
    expect(exists).toBeTruthy();
  }

  protected async expectEntityNotExists(entity: string, criteria: object) {
    const exists = await this.connection
      .getRepository(entity)
      .findOne({ where: criteria });
    expect(exists).toBeFalsy();
  }
}
