export declare const GetUser: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export declare const Pagination: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const ApiPagination: () => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const NoCache: () => import("@nestjs/common").CustomDecorator<string>;
export declare const RequirePermissions: (...permissions: string[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const ApiFile: (fileName?: string) => MethodDecorator;
export declare const ApiFiles: (fileName?: string) => MethodDecorator;
export declare const ApiPaginatedResponse: (dto: any) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
