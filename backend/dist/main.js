"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const compression = require("compression");
const config_service_1 = require("./config/config.service");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const interceptors_1 = require("./common/interceptors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_service_1.ConfigService);
    app.use(compression());
    if (configService.cors.enabled) {
        app.enableCors({
            origin: configService.cors.origin,
            credentials: configService.cors.credentials,
        });
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter(), new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new interceptors_1.TimeoutInterceptor(), new interceptors_1.LoggingInterceptor(), new interceptors_1.TransformInterceptor());
    if (configService.swagger.enabled) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle(configService.swagger.title)
            .setDescription(configService.swagger.description)
            .setVersion(configService.swagger.version)
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup(configService.swagger.path, app, document);
    }
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
//# sourceMappingURL=main.js.map