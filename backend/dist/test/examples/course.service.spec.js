"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const course_service_1 = require("../../modules/courses/course.service");
const course_entity_1 = require("../../entities/course.entity");
const test_mocks_1 = require("../test.mocks");
const common_1 = require("@nestjs/common");
describe('CourseService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                course_service_1.CourseService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(course_entity_1.Course),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        createQueryBuilder: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = module.get(course_service_1.CourseService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(course_entity_1.Course));
        jest.clearAllMocks();
    });
    describe('findAll', () => {
        it('should return an array of courses', async () => {
            const mockCourses = [
                test_mocks_1.TestMocks.mockCourse(),
                { ...test_mocks_1.TestMocks.mockCourse(), id: 'test-course-id-2' },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(mockCourses);
            const result = await service.findAll();
            expect(result).toEqual(mockCourses);
            expect(repository.find).toHaveBeenCalledWith({
                relations: ['gym', 'coach', 'trainings'],
            });
        });
    });
    describe('findOne', () => {
        it('should return a course by id', async () => {
            const mockCourse = test_mocks_1.TestMocks.mockCourse();
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockCourse);
            const result = await service.findOne(mockCourse.id);
            expect(result).toEqual(mockCourse);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: mockCourse.id },
                relations: ['gym', 'coach', 'trainings'],
            });
        });
        it('should throw NotFoundException if course not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await expect(service.findOne('non-existent-id')).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('create', () => {
        it('should create a new course', async () => {
            const mockCourse = test_mocks_1.TestMocks.mockCourse();
            const createDto = {
                name: mockCourse.name,
                description: mockCourse.description,
                type: course_entity_1.CourseType.GROUP,
                level: course_entity_1.CourseLevel.BEGINNER,
                capacity: mockCourse.capacity,
                price: mockCourse.price,
                startTime: mockCourse.startTime,
                endTime: mockCourse.endTime,
                schedule: mockCourse.schedule,
                gymId: mockCourse.gymId,
                coachId: mockCourse.coachId,
            };
            const expectedCourse = {
                ...createDto,
                enrolledStudents: 0,
                completedSessions: 0,
                averageRating: 0,
                isActive: true,
            };
            jest.spyOn(repository, 'create').mockReturnValue(expectedCourse);
            jest.spyOn(repository, 'save').mockResolvedValue(expectedCourse);
            const result = await service.create(createDto);
            expect(result).toEqual(expectedCourse);
            expect(repository.create).toHaveBeenCalledWith(expectedCourse);
            expect(repository.save).toHaveBeenCalledWith(expectedCourse);
        });
        it('should throw BadRequestException if validation fails', async () => {
            const invalidDto = {
                name: '',
                description: 'Test description',
                type: course_entity_1.CourseType.GROUP,
                level: course_entity_1.CourseLevel.BEGINNER,
                capacity: -1,
                price: -100,
                startTime: '25:00',
                endTime: '10:00',
                schedule: [],
                gymId: 'test-gym-id',
                coachId: 'test-coach-id',
            };
            await expect(service.create(invalidDto)).rejects.toThrow(common_1.BadRequestException);
        });
    });
    describe('update', () => {
        it('should update an existing course', async () => {
            const mockCourse = test_mocks_1.TestMocks.mockCourse();
            const updateDto = {
                name: 'Updated Course Name',
                description: 'Updated description',
            };
            const updatedCourse = { ...mockCourse, ...updateDto };
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockCourse);
            jest.spyOn(repository, 'save').mockResolvedValue(updatedCourse);
            const result = await service.update(mockCourse.id, updateDto);
            expect(result).toEqual(updatedCourse);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: mockCourse.id },
            });
            expect(repository.save).toHaveBeenCalledWith(updatedCourse);
        });
        it('should throw NotFoundException if course not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await expect(service.update('non-existent-id', { name: 'Updated Name' })).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('delete', () => {
        it('should delete an existing course', async () => {
            const mockCourse = test_mocks_1.TestMocks.mockCourse();
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockCourse);
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: [] });
            await service.delete(mockCourse.id);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: mockCourse.id },
            });
            expect(repository.delete).toHaveBeenCalledWith(mockCourse.id);
        });
        it('should throw NotFoundException if course not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await expect(service.delete('non-existent-id')).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=course.service.spec.js.map