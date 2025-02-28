"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const course_controller_1 = require("../../modules/courses/course.controller");
const course_service_1 = require("../../modules/courses/course.service");
const common_1 = require("@nestjs/common");
const course_helper_1 = require("../helpers/course.helper");
describe('CourseController', () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [course_controller_1.CourseController],
            providers: [
                {
                    provide: course_service_1.CourseService,
                    useValue: {
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        findByGym: jest.fn(),
                        findByCoach: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();
        controller = module.get(course_controller_1.CourseController);
        service = module.get(course_service_1.CourseService);
    });
    describe('findAll', () => {
        it('should return an array of courses', async () => {
            const mockCourses = course_helper_1.CourseTestHelper.createMockCourseArray();
            jest.spyOn(service, 'findAll').mockResolvedValue(mockCourses);
            const result = await controller.findAll();
            expect(result).toEqual(mockCourses);
            expect(service.findAll).toHaveBeenCalled();
        });
    });
    describe('findOne', () => {
        it('should return a single course', async () => {
            const mockCourse = course_helper_1.CourseTestHelper.createMockCourse();
            jest.spyOn(service, 'findOne').mockResolvedValue(mockCourse);
            const result = await controller.findOne(mockCourse.id);
            expect(result).toEqual(mockCourse);
            expect(service.findOne).toHaveBeenCalledWith(mockCourse.id);
        });
        it('should throw NotFoundException when course not found', async () => {
            jest.spyOn(service, 'findOne').mockRejectedValue(new common_1.NotFoundException());
            await expect(controller.findOne('non-existent-id')).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('create', () => {
        it('should create a new course', async () => {
            const createDto = course_helper_1.CourseTestHelper.createMockCreateCourseDto();
            const mockCourse = course_helper_1.CourseTestHelper.createMockCourse();
            jest.spyOn(service, 'create').mockResolvedValue(mockCourse);
            const result = await controller.create(createDto);
            expect(result).toEqual(mockCourse);
            expect(service.create).toHaveBeenCalledWith(createDto);
        });
        it('should throw BadRequestException for invalid data', async () => {
            const invalidDto = {
                ...course_helper_1.CourseTestHelper.createMockCreateCourseDto(),
                capacity: -1,
            };
            jest.spyOn(service, 'create').mockRejectedValue(new common_1.BadRequestException());
            await expect(controller.create(invalidDto)).rejects.toThrow(common_1.BadRequestException);
        });
    });
    describe('update', () => {
        it('should update an existing course', async () => {
            const updateDto = course_helper_1.CourseTestHelper.createMockUpdateCourseDto();
            const mockCourse = course_helper_1.CourseTestHelper.createMockCourse();
            const updatedCourse = { ...mockCourse, ...updateDto };
            jest.spyOn(service, 'update').mockResolvedValue(updatedCourse);
            const result = await controller.update(mockCourse.id, updateDto);
            expect(result).toEqual(updatedCourse);
            expect(service.update).toHaveBeenCalledWith(mockCourse.id, updateDto);
        });
        it('should throw NotFoundException when course not found', async () => {
            const updateDto = course_helper_1.CourseTestHelper.createMockUpdateCourseDto();
            jest.spyOn(service, 'update').mockRejectedValue(new common_1.NotFoundException());
            await expect(controller.update('non-existent-id', updateDto)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('delete', () => {
        it('should delete an existing course', async () => {
            const mockCourse = course_helper_1.CourseTestHelper.createMockCourse();
            jest.spyOn(service, 'delete').mockResolvedValue(undefined);
            await controller.delete(mockCourse.id);
            expect(service.delete).toHaveBeenCalledWith(mockCourse.id);
        });
        it('should throw NotFoundException when course not found', async () => {
            jest.spyOn(service, 'delete').mockRejectedValue(new common_1.NotFoundException());
            await expect(controller.delete('non-existent-id')).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('findByGym', () => {
        it('should return courses for a specific gym', async () => {
            const mockCourses = course_helper_1.CourseTestHelper.createMockCourseArray();
            const gymId = course_helper_1.CourseTestHelper.createMockGym().id;
            jest.spyOn(service, 'findByGym').mockResolvedValue(mockCourses);
            const result = await controller.findByGym(gymId);
            expect(result).toEqual(mockCourses);
            expect(service.findByGym).toHaveBeenCalledWith(gymId);
        });
    });
    describe('findByCoach', () => {
        it('should return courses for a specific coach', async () => {
            const mockCourses = course_helper_1.CourseTestHelper.createMockCourseArray();
            const coachId = course_helper_1.CourseTestHelper.createMockCoach().id;
            jest.spyOn(service, 'findByCoach').mockResolvedValue(mockCourses);
            const result = await controller.findByCoach(coachId);
            expect(result).toEqual(mockCourses);
            expect(service.findByCoach).toHaveBeenCalledWith(coachId);
        });
    });
});
//# sourceMappingURL=course.controller.spec.js.map