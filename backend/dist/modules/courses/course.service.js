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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("../../entities/course.entity");
let CourseService = class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async findAll() {
        return this.courseRepository.find({
            relations: ['gym', 'coach', 'trainings'],
        });
    }
    async findByGym(gymId) {
        return this.courseRepository.find({
            where: { gymId },
            relations: ['gym', 'coach', 'trainings'],
        });
    }
    async findByCoach(coachId) {
        return this.courseRepository.find({
            where: { coachId },
            relations: ['gym', 'coach', 'trainings'],
        });
    }
    async findOne(id) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['gym', 'coach', 'trainings'],
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID "${id}" not found`);
        }
        return course;
    }
    async create(createCourseDto) {
        const course = this.courseRepository.create({
            ...createCourseDto,
            enrolledStudents: 0,
            completedSessions: 0,
            averageRating: 0,
            isActive: true,
        });
        return this.courseRepository.save(course);
    }
    async update(id, updateCourseDto) {
        const course = await this.courseRepository.findOne({ where: { id } });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID "${id}" not found`);
        }
        if (updateCourseDto.startTime || updateCourseDto.endTime) {
            const startTime = updateCourseDto.startTime || course.startTime;
            const endTime = updateCourseDto.endTime || course.endTime;
            const start = new Date(`1970-01-01T${startTime}`);
            const end = new Date(`1970-01-01T${endTime}`);
            if (end <= start) {
                throw new common_1.BadRequestException('End time must be after start time');
            }
        }
        Object.assign(course, updateCourseDto);
        return this.courseRepository.save(course);
    }
    async delete(id) {
        const course = await this.courseRepository.findOne({ where: { id } });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID "${id}" not found`);
        }
        await this.courseRepository.delete(id);
    }
    async updateEnrollmentCount(id, increment) {
        const course = await this.findOne(id);
        if (increment && course.enrolledStudents >= course.capacity) {
            throw new common_1.BadRequestException('Course is at maximum capacity');
        }
        course.enrolledStudents += increment ? 1 : -1;
        return this.courseRepository.save(course);
    }
    async updateCompletedSessions(id) {
        const course = await this.findOne(id);
        course.completedSessions += 1;
        return this.courseRepository.save(course);
    }
    async updateAverageRating(id, newRating) {
        const course = await this.findOne(id);
        const currentTotal = course.averageRating * course.completedSessions;
        const newTotal = currentTotal + newRating;
        course.averageRating = newTotal / (course.completedSessions + 1);
        return this.courseRepository.save(course);
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CourseService);
//# sourceMappingURL=course.service.js.map