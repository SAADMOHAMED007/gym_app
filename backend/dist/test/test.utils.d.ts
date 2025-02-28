import { INestApplication } from '@nestjs/common';
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
export declare class TestUtils {
    private app;
    private moduleRef;
    private dataSource;
    initializeApp(): Promise<INestApplication>;
    getApp(): INestApplication;
    closeApp(): Promise<void>;
    cleanTestData(): Promise<void>;
    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T>;
    clearRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<void>;
}
