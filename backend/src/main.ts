import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ConfigService } from './config/config.service';
import { 
  HttpExceptionFilter, 
  AllExceptionsFilter 
} from './common/filters/http-exception.filter';
import { 
  TransformInterceptor,
  LoggingInterceptor,
  TimeoutInterceptor,
} from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security middleware
  app.use(compression());

  // CORS configuration
  if (configService.cors.enabled) {
    app.enableCors({
      origin: configService.cors.origin,
      credentials: configService.cors.credentials,
    });
  }

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
  );

  // Global interceptors
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // Swagger API documentation
  if (configService.swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(configService.swagger.title)
      .setDescription(configService.swagger.description)
      .setVersion(configService.swagger.version)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(configService.swagger.path, app, document);
  }

  // Start the server
  const port = configService.port;
  await app.listen(port);
  
  if (configService.isDevelopment) {
    console.log(`Application is running on: http://localhost:${port}`);
    if (configService.swagger.enabled) {
      console.log(`API documentation available at: http://localhost:${port}/${configService.swagger.path}`);
    }
  }
}

bootstrap();
