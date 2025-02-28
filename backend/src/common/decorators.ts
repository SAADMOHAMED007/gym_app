import { createParamDecorator, ExecutionContext, SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { PaginationParams } from './types';
import { DEFAULT_PAGINATION } from './constants';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest();
    const page = parseInt(request.query.page) || DEFAULT_PAGINATION.page;
    const limit = parseInt(request.query.limit) || DEFAULT_PAGINATION.limit;
    const sort = request.query.sort || 'createdAt';
    const order = request.query.order?.toUpperCase() || 'DESC';

    return { page, limit, sort, order };
  },
);

export const ApiPagination = () => {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'sort', required: false, type: String }),
    ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'] }),
  );
};

export const NoCache = () => SetMetadata('no-cache', true);

export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

export const ApiFile = (fileName: string = 'file'): MethodDecorator => {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
};

export const ApiFiles = (fileName: string = 'files'): MethodDecorator => {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    }),
  );
};

export const ApiPaginatedResponse = (dto: any) => {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'sort', required: false, type: String }),
    ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'] }),
  );
};
