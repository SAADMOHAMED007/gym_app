"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginatedResponse = exports.ApiFiles = exports.ApiFile = exports.RequirePermissions = exports.NoCache = exports.ApiPagination = exports.Pagination = exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("./constants");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
        return request.user[data];
    }
    return request.user;
});
exports.Pagination = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const page = parseInt(request.query.page) || constants_1.DEFAULT_PAGINATION.page;
    const limit = parseInt(request.query.limit) || constants_1.DEFAULT_PAGINATION.limit;
    const sort = request.query.sort || 'createdAt';
    const order = request.query.order?.toUpperCase() || 'DESC';
    return { page, limit, sort, order };
});
const ApiPagination = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }), (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String }), (0, swagger_1.ApiQuery)({ name: 'order', required: false, enum: ['ASC', 'DESC'] }));
};
exports.ApiPagination = ApiPagination;
const NoCache = () => (0, common_1.SetMetadata)('no-cache', true);
exports.NoCache = NoCache;
const RequirePermissions = (...permissions) => (0, common_1.SetMetadata)('permissions', permissions);
exports.RequirePermissions = RequirePermissions;
const ApiFile = (fileName = 'file') => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                [fileName]: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }));
};
exports.ApiFile = ApiFile;
const ApiFiles = (fileName = 'files') => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
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
    }));
};
exports.ApiFiles = ApiFiles;
const ApiPaginatedResponse = (dto) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }), (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String }), (0, swagger_1.ApiQuery)({ name: 'order', required: false, enum: ['ASC', 'DESC'] }));
};
exports.ApiPaginatedResponse = ApiPaginatedResponse;
//# sourceMappingURL=decorators.js.map