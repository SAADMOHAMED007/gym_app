import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly timeoutDuration: number = 30000) {} // Default 30 seconds

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Skip timeout for file uploads and downloads
    const request = context.switchToHttp().getRequest();
    const isFileOperation = request.headers['content-type']?.includes('multipart/form-data') ||
      request.headers['accept']?.includes('application/octet-stream');

    if (isFileOperation) {
      return next.handle();
    }

    return next.handle().pipe(
      timeout(this.timeoutDuration),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException(
            'Request processing time exceeded the limit'
          ));
        }
        return throwError(() => err);
      }),
    );
  }
}
