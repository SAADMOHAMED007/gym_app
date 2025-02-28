import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DataSource, EntityManager, Repository, EntityTarget, ObjectLiteral, DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';
import { Gym } from '../entities/gym.entity';
import { Course } from '../entities/course.entity';
import { Exercise } from '../entities/exercise.entity';
import { Training } from '../entities/training.entity';
import { Nutrition } from '../entities/nutrition.entity';
import { Promotion } from '../entities/promotion.entity';

@Injectable()
export class TestDatabaseService implements OnModuleInit, OnModuleDestroy {
  private dataSource: DataSource;
  private manager: EntityManager;

  // Repositories
  private userRepository: Repository<User>;
  private gymRepository: Repository<Gym>;
  private courseRepository: Repository<Course>;
  private exerciseRepository: Repository<Exercise>;
  private trainingRepository: Repository<Training>;
  private nutritionRepository: Repository<Nutrition>;
  private promotionRepository: Repository<Promotion>;

  async onModuleInit() {
    // Create connection
    this.dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Gym, Course, Exercise, Training, Nutrition, Promotion],
      synchronize: true,
      logging: false,
      dropSchema: true,
    });

    await this.dataSource.initialize();
    this.manager = this.dataSource.manager;

    // Initialize repositories
    this.userRepository = this.dataSource.getRepository(User);
    this.gymRepository = this.dataSource.getRepository(Gym);
    this.courseRepository = this.dataSource.getRepository(Course);
    this.exerciseRepository = this.dataSource.getRepository(Exercise);
    this.trainingRepository = this.dataSource.getRepository(Training);
    this.nutritionRepository = this.dataSource.getRepository(Nutrition);
    this.promotionRepository = this.dataSource.getRepository(Promotion);

    // Sync database schema
    await this.dataSource.synchronize(true);
  }

  async onModuleDestroy() {
    if (this.dataSource) {
      await this.dataSource.destroy();
    }
  }

  async cleanDatabase() {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      return;
    }

    // Drop all tables
    await this.dataSource.synchronize(true);
  }

  // Repository getters
  getUserRepository(): Repository<User> {
    return this.userRepository;
  }

  getGymRepository(): Repository<Gym> {
    return this.gymRepository;
  }

  getCourseRepository(): Repository<Course> {
    return this.courseRepository;
  }

  getExerciseRepository(): Repository<Exercise> {
    return this.exerciseRepository;
  }

  getTrainingRepository(): Repository<Training> {
    return this.trainingRepository;
  }

  getNutritionRepository(): Repository<Nutrition> {
    return this.nutritionRepository;
  }

  getPromotionRepository(): Repository<Promotion> {
    return this.promotionRepository;
  }

  // Helper methods for transactions
  async runInTransaction<T>(operation: (entityManager: EntityManager) => Promise<T>): Promise<T> {
    return this.manager.transaction(operation);
  }

  // Helper methods for database operations
  async clearTable(entity: EntityTarget<ObjectLiteral>) {
    await this.manager.clear(entity);
  }

  async clearAllTables() {
    const entities = this.dataSource.entityMetadatas;
    for (const entity of entities) {
      await this.manager.clear(entity.target);
    }
  }

  // Helper methods for test data creation
  async createTestData<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    data: DeepPartial<T>,
  ): Promise<T> {
    const repository = this.dataSource.getRepository<T>(entity);
    return repository.save(repository.create(data));
  }

  async createTestDataInBulk<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    dataArray: DeepPartial<T>[],
  ): Promise<T[]> {
    const repository = this.dataSource.getRepository<T>(entity);
    const entities = dataArray.map(data => repository.create(data));
    return repository.save(entities);
  }

  // Helper methods for test data cleanup
  async removeTestData<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    condition: Partial<T>,
  ): Promise<T[]> {
    const repository = this.dataSource.getRepository<T>(entity);
    const entities = await repository.find({ where: condition as any });
    return repository.remove(entities);
  }

  async removeAllTestData() {
    await this.clearAllTables();
  }

  // Helper methods for test data verification
  async verifyTestData<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    condition: Partial<T>,
  ): Promise<boolean> {
    const repository = this.dataSource.getRepository<T>(entity);
    const count = await repository.count({ where: condition as any });
    return count > 0;
  }

  async getTestData<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    condition: Partial<T>,
  ): Promise<T[]> {
    const repository = this.dataSource.getRepository<T>(entity);
    return repository.find({ where: condition as any });
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }

  getManager(): EntityManager {
    return this.manager;
  }
}
