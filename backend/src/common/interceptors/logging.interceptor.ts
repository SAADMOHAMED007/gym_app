import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { method, url, body, query, params, ip } = request;
    const userAgent = request.get('user-agent') || '';
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (data: any) => {
          const response = ctx.getResponse();
          const delay = Date.now() - startTime;

          this.logger.log(
            `${method} ${url} ${response.statusCode} ${delay}ms\n` +
            `IP: ${ip}\n` +
            `User-Agent: ${userAgent}\n` +
            `Query: ${JSON.stringify(query)}\n` +
            `Params: ${JSON.stringify(params)}\n` +
            `Body: ${this.sanitizeBody(body)}\n` +
            `Response: ${this.sanitizeResponse(data)}`,
          );
        },
        error: (error: any) => {
          const delay = Date.now() - startTime;
          
          this.logger.error(
            `${method} ${url} ${error.status || 500} ${delay}ms\n` +
            `IP: ${ip}\n` +
            `User-Agent: ${userAgent}\n` +
            `Query: ${JSON.stringify(query)}\n` +
            `Params: ${JSON.stringify(params)}\n` +
            `Body: ${this.sanitizeBody(body)}\n` +
            `Error: ${error.message}`,
            error.stack,
          );
        },
      }),
    );
  }

  private sanitizeBody(body: any): string {
    if (!body) return 'No body';

    // Create a copy of the body to avoid modifying the original
    const sanitized = { ...body };

    // Remove sensitive fields
    const sensitiveFields = ['password', 'token', 'authorization', 'credit_card'];
    sensitiveFields.forEach(field => {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    });

    return JSON.stringify(sanitized);
  }

  private sanitizeResponse(data: any): string {
    if (!data) return 'No response data';

    if (typeof data === 'object') {
      // Create a copy of the data to avoid modifying the original
      const sanitized = { ...data };

      // Remove potentially large or sensitive fields
      const fieldsToOmit = ['file', 'buffer', 'stream', 'token'];
      fieldsToOmit.forEach(field => {
        if (field in sanitized) {
          sanitized[field] = '[OMITTED]';
        }
      });

      return JSON.stringify(sanitized);
    }

    return String(data);
  }
}
