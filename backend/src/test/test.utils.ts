import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../app.module';
import { TEST_DATABASE_CONFIG } from './test.config';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export class TestUtils {
  private app: INestApplication;
  private moduleRef: TestingModule;
  private dataSource: DataSource;

  async initializeApp(): Promise<INestApplication> {
    this.moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
        }),
        TypeOrmModule.forRoot({
          ...TEST_DATABASE_CONFIG,
          autoLoadEntities: true,
        }),
        AppModule,
      ],
    }).compile();

    this.app = this.moduleRef.createNestApplication();
    await this.app.init();
    this.dataSource = this.moduleRef.get<DataSource>(DataSource);
    return this.app;
  }

  getApp(): INestApplication {
    if (!this.app) {
      throw new Error('App not initialized. Call initializeApp() first.');
    }
    return this.app;
  }

  async closeApp(): Promise<void> {
    if (this.app) {
      await this.app.close();
    }
  }

  async cleanTestData(): Promise<void> {
    if (!this.dataSource) {
      throw new Error('DataSource not initialized. Call initializeApp() first.');
    }

    const entities = this.dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = this.dataSource.getRepository(entity.name);
      await repository.clear();
    }
  }

  getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
    if (!this.dataSource) {
      throw new Error('DataSource not initialized. Call initializeApp() first.');
    }
    return this.dataSource.getRepository(entity);
  }

  async clearRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<void> {
    const repository = this.getRepository(entity);
    await repository.clear();
  }
}
