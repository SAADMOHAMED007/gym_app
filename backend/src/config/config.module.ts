import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validationSchema } from './validation.schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      expandVariables: true,
      cache: true,
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
