import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseService } from '../../modules/courses/course.service';
import { Course, CourseType, CourseLevel } from '../../entities/course.entity';
import { TestMocks } from '../test.mocks';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('CourseService', () => {
  let service: CourseService;
  let repository: Repository<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(Course),
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

    service = module.get<CourseService>(CourseService);
    repository = module.get<Repository<Course>>(getRepositoryToken(Course));

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const mockCourses = [
        TestMocks.mockCourse(),
        { ...TestMocks.mockCourse(), id: 'test-course-id-2' },
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
      const mockCourse = TestMocks.mockCourse();

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

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const mockCourse = TestMocks.mockCourse();
      const createDto = {
        name: mockCourse.name,
        description: mockCourse.description,
        type: CourseType.GROUP,
        level: CourseLevel.BEGINNER,
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

      jest.spyOn(repository, 'create').mockReturnValue(expectedCourse as Course);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedCourse as Course);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedCourse);
      expect(repository.create).toHaveBeenCalledWith(expectedCourse);
      expect(repository.save).toHaveBeenCalledWith(expectedCourse);
    });

    it('should throw BadRequestException if validation fails', async () => {
      const invalidDto = {
        name: '', // Invalid: empty name
        description: 'Test description',
        type: CourseType.GROUP,
        level: CourseLevel.BEGINNER,
        capacity: -1, // Invalid: negative capacity
        price: -100, // Invalid: negative price
        startTime: '25:00', // Invalid: invalid time
        endTime: '10:00',
        schedule: [],
        gymId: 'test-gym-id',
        coachId: 'test-coach-id',
      };

      await expect(service.create(invalidDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update an existing course', async () => {
      const mockCourse = TestMocks.mockCourse();
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

      await expect(
        service.update('non-existent-id', { name: 'Updated Name' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete an existing course', async () => {
      const mockCourse = TestMocks.mockCourse();

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

      await expect(service.delete('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
