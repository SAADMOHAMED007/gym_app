"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const { method, url, body, query, params, ip } = request;
        const userAgent = request.get('user-agent') || '';
        const startTime = Date.now();
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                const response = ctx.getResponse();
                const delay = Date.now() - startTime;
                this.logger.log(`${method} ${url} ${response.statusCode} ${delay}ms\n` +
                    `IP: ${ip}\n` +
                    `User-Agent: ${userAgent}\n` +
                    `Query: ${JSON.stringify(query)}\n` +
                    `Params: ${JSON.stringify(params)}\n` +
                    `Body: ${this.sanitizeBody(body)}\n` +
                    `Response: ${this.sanitizeResponse(data)}`);
            },
            error: (error) => {
                const delay = Date.now() - startTime;
                this.logger.error(`${method} ${url} ${error.status || 500} ${delay}ms\n` +
                    `IP: ${ip}\n` +
                    `User-Agent: ${userAgent}\n` +
                    `Query: ${JSON.stringify(query)}\n` +
                    `Params: ${JSON.stringify(params)}\n` +
                    `Body: ${this.sanitizeBody(body)}\n` +
                    `Error: ${error.message}`, error.stack);
            },
        }));
    }
    sanitizeBody(body) {
        if (!body)
            return 'No body';
        const sanitized = { ...body };
        const sensitiveFields = ['password', 'token', 'authorization', 'credit_card'];
        sensitiveFields.forEach(field => {
            if (field in sanitized) {
                sanitized[field] = '[REDACTED]';
            }
        });
        return JSON.stringify(sanitized);
    }
    sanitizeResponse(data) {
        if (!data)
            return 'No response data';
        if (typeof data === 'object') {
            const sanitized = { ...data };
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
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map