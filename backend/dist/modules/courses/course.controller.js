"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const course_service_1 = require("./course.service");
const dto_1 = require("./dto");
const course_entity_1 = require("../../entities/course.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../../entities/user.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async findAll() {
        return this.courseService.findAll();
    }
    async findOne(id) {
        return this.courseService.findOne(id);
    }
    async create(createCourseDto) {
        return this.courseService.create(createCourseDto);
    }
    async update(id, updateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }
    async delete(id) {
        return this.courseService.delete(id);
    }
    async findByGym(gymId) {
        return this.courseService.findByGym(gymId);
    }
    async findByCoach(coachId) {
        return this.courseService.findByCoach(coachId);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all courses.', type: [course_entity_1.Course] }),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/course.entity").Course] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get a course by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the course.', type: course_entity_1.Course }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found.' }),
    openapi.ApiResponse({ status: 200, type: require("../../entities/course.entity").Course }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.COACH),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new course' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The course has been created.', type: course_entity_1.Course }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data.' }),
    openapi.ApiResponse({ status: 201, type: require("../../entities/course.entity").Course }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.COACH),
    (0, swagger_1.ApiOperation)({ summary: 'Update a course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The course has been updated.', type: course_entity_1.Course }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data.' }),
    openapi.ApiResponse({ status: 200, type: require("../../entities/course.entity").Course }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The course has been deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('gym/:gymId'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses for a gym' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all courses for the gym.', type: [course_entity_1.Course] }),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/course.entity").Course] }),
    __param(0, (0, common_1.Param)('gymId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findByGym", null);
__decorate([
    (0, common_1.Get)('coach/:coachId'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses for a coach' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all courses for the coach.', type: [course_entity_1.Course] }),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/course.entity").Course] }),
    __param(0, (0, common_1.Param)('coachId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findByCoach", null);
exports.CourseController = CourseController = __decorate([
    (0, swagger_1.ApiTags)('courses'),
    (0, common_1.Controller)('courses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map