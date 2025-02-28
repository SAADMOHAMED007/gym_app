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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseDto = exports.CreateCourseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const course_entity_1 = require("../../../entities/course.entity");
class ScheduleItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { day: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Monday', description: 'Day of the week' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleItemDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether the course is active on this day' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ScheduleItemDto.prototype, "isActive", void 0);
class CreateCourseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, type: { required: true, enum: require("../../../entities/course.entity").CourseType }, level: { required: true, enum: require("../../../entities/course.entity").CourseLevel }, capacity: { required: true, type: () => Number, minimum: 1 }, price: { required: true, type: () => Number, minimum: 0 }, startTime: { required: true, type: () => String, pattern: "/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/" }, endTime: { required: true, type: () => String, pattern: "/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/" }, schedule: { required: true, type: () => [ScheduleItemDto] }, gymId: { required: true, type: () => String }, coachId: { required: true, type: () => String }, image: { required: false, type: () => String } };
    }
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Yoga Basics', description: 'Name of the course' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction to basic yoga poses', description: 'Course description' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: course_entity_1.CourseType, example: course_entity_1.CourseType.GROUP, description: 'Type of course' }),
    (0, class_validator_1.IsEnum)(course_entity_1.CourseType),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: course_entity_1.CourseLevel, example: course_entity_1.CourseLevel.BEGINNER, description: 'Course difficulty level' }),
    (0, class_validator_1.IsEnum)(course_entity_1.CourseLevel),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: 'Maximum number of participants' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Course price' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00', description: 'Course start time (HH:MM)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Start time must be in HH:MM format',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:00', description: 'Course end time (HH:MM)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'End time must be in HH:MM format',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ScheduleItemDto],
        example: [{ day: 'Monday', isActive: true }],
        description: 'Course schedule'
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ScheduleItemDto),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid', description: 'ID of the gym where the course is held' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "gymId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid', description: 'ID of the coach teaching the course' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "coachId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'course-image.jpg', description: 'Course image URL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "image", void 0);
class UpdateCourseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, type: { required: false, enum: require("../../../entities/course.entity").CourseType }, level: { required: false, enum: require("../../../entities/course.entity").CourseLevel }, capacity: { required: false, type: () => Number, minimum: 1 }, price: { required: false, type: () => Number, minimum: 0 }, startTime: { required: false, type: () => String, pattern: "/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/" }, endTime: { required: false, type: () => String, pattern: "/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/" }, schedule: { required: false, type: () => [ScheduleItemDto] }, gymId: { required: false, type: () => String }, coachId: { required: false, type: () => String }, image: { required: false, type: () => String } };
    }
}
exports.UpdateCourseDto = UpdateCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Yoga Basics', description: 'Name of the course', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction to basic yoga poses', description: 'Course description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: course_entity_1.CourseType, example: course_entity_1.CourseType.GROUP, description: 'Type of course', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(course_entity_1.CourseType),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: course_entity_1.CourseLevel, example: course_entity_1.CourseLevel.BEGINNER, description: 'Course difficulty level', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(course_entity_1.CourseLevel),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: 'Maximum number of participants', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Course price', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00', description: 'Course start time (HH:MM)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Start time must be in HH:MM format',
    }),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:00', description: 'Course end time (HH:MM)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'End time must be in HH:MM format',
    }),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ScheduleItemDto],
        example: [{ day: 'Monday', isActive: true }],
        description: 'Course schedule',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ScheduleItemDto),
    __metadata("design:type", Array)
], UpdateCourseDto.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid', description: 'ID of the gym where the course is held', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "gymId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid', description: 'ID of the coach teaching the course', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "coachId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'course-image.jpg', description: 'Course image URL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "image", void 0);
//# sourceMappingURL=course.dto.js.map