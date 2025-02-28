"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        return next.handle().pipe((0, operators_1.map)(data => {
            if (response.getHeader('Content-Type')?.includes('application/octet-stream')) {
                return data;
            }
            const statusCode = response.statusCode;
            let message = 'Success';
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
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
//# sourceMappingURL=transform.interceptor.js.map