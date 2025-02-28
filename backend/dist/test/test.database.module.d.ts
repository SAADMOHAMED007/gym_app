import { DynamicModule } from '@nestjs/common';
import { TestDatabaseService } from './test.database';
export declare class TestDatabaseModule {
    private readonly databaseService;
    static forRoot(): DynamicModule;
    static forFeature(customEntities?: any[]): DynamicModule;
    static forRepository(entity: any): DynamicModule;
    static forTest(): Promise<DynamicModule>;
    constructor(databaseService: TestDatabaseService);
    onModuleDestroy(): Promise<void>;
}
