import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { TestingModule, TestingModuleBuilder } from '@nestjs/testing';
export interface TestModuleOptions extends Pick<ModuleMetadata, 'imports' | 'providers'> {
    controllers?: Type<any>[];
    mockProviders?: Provider[];
    overrideProviders?: [Type<any>, Partial<Record<keyof any, jest.Mock>>][];
}
export declare class TestModuleFactory {
    static create(options?: TestModuleOptions): Promise<TestingModule>;
    static createTestingModuleBuilder(metadata: ModuleMetadata): Promise<TestingModuleBuilder>;
    static getProviderMock<T extends object>(type: Type<T>, methodNames: Array<keyof T>): jest.Mocked<T>;
    static createMockRepository<T = any>(): {
        find: jest.Mock<any, any, any>;
        findOne: jest.Mock<any, any, any>;
        save: jest.Mock<any, any, any>;
        create: jest.Mock<any, any, any>;
        update: jest.Mock<any, any, any>;
        delete: jest.Mock<any, any, any>;
        remove: jest.Mock<any, any, any>;
        count: jest.Mock<any, any, any>;
        createQueryBuilder: jest.Mock<{
            where: jest.Mock<any, any, any>;
            andWhere: jest.Mock<any, any, any>;
            orderBy: jest.Mock<any, any, any>;
            skip: jest.Mock<any, any, any>;
            take: jest.Mock<any, any, any>;
            getMany: jest.Mock<any, any, any>;
            getOne: jest.Mock<any, any, any>;
            getManyAndCount: jest.Mock<any, any, any>;
            leftJoinAndSelect: jest.Mock<any, any, any>;
            innerJoinAndSelect: jest.Mock<any, any, any>;
            select: jest.Mock<any, any, any>;
        }, [], any>;
    };
    static createTestingApp(module: TestingModule): Promise<import("@nestjs/common").INestApplication<any>>;
    static cleanupTestingApp(app: any): Promise<void>;
}
