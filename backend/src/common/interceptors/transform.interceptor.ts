import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiSuccessResponse } from '../types';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiSuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiSuccessResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map(data => {
        // Skip transformation for file downloads or specific routes
        if (response.getHeader('Content-Type')?.includes('application/octet-stream')) {
          return data;
        }

        const statusCode = response.statusCode;
        let message = 'Success';

        // Customize message based on request method and status code
        switch (request.method) {
          case 'POST':
            message = statusCode === 201 ? 'Created successfully' : 'Operation successful';
            break;
          case 'PUT':
          case 'PATCH':
            message = 'Updated successfully';
            break;
          case 'DELETE':
            message = 'Deleted successfully';
            break;
        }

        return {
          statusCode,
          message,
          data,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }),
    );
  }
}
