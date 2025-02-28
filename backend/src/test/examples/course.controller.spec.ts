import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from '../../modules/courses/course.controller';
import { CourseService } from '../../modules/courses/course.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CourseTestHelper } from '../helpers/course.helper';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
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

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const mockCourses = CourseTestHelper.createMockCourseArray();
      jest.spyOn(service, 'findAll').mockResolvedValue(mockCourses);

      const result = await controller.findAll();

      expect(result).toEqual(mockCourses);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single course', async () => {
      const mockCourse = CourseTestHelper.createMockCourse();
      jest.spyOn(service, 'findOne').mockResolvedValue(mockCourse);

      const result = await controller.findOne(mockCourse.id);

      expect(result).toEqual(mockCourse);
      expect(service.findOne).toHaveBeenCalledWith(mockCourse.id);
    });

    it('should throw NotFoundException when course not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const createDto = CourseTestHelper.createMockCreateCourseDto();
      const mockCourse = CourseTestHelper.createMockCourse();
      
      jest.spyOn(service, 'create').mockResolvedValue(mockCourse);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockCourse);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });

    it('should throw BadRequestException for invalid data', async () => {
      const invalidDto = {
        ...CourseTestHelper.createMockCreateCourseDto(),
        capacity: -1, // Invalid: negative capacity
      };

      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing course', async () => {
      const updateDto = CourseTestHelper.createMockUpdateCourseDto();
      const mockCourse = CourseTestHelper.createMockCourse();
      const updatedCourse = { ...mockCourse, ...updateDto };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCourse);

      const result = await controller.update(mockCourse.id, updateDto);

      expect(result).toEqual(updatedCourse);
      expect(service.update).toHaveBeenCalledWith(mockCourse.id, updateDto);
    });

    it('should throw NotFoundException when course not found', async () => {
      const updateDto = CourseTestHelper.createMockUpdateCourseDto();
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(
        controller.update('non-existent-id', updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete an existing course', async () => {
      const mockCourse = CourseTestHelper.createMockCourse();
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      await controller.delete(mockCourse.id);

      expect(service.delete).toHaveBeenCalledWith(mockCourse.id);
    });

    it('should throw NotFoundException when course not found', async () => {
      jest.spyOn(service, 'delete').mockRejectedValue(new NotFoundException());

      await expect(controller.delete('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByGym', () => {
    it('should return courses for a specific gym', async () => {
      const mockCourses = CourseTestHelper.createMockCourseArray();
      const gymId = CourseTestHelper.createMockGym().id;

      jest.spyOn(service, 'findByGym').mockResolvedValue(mockCourses);

      const result = await controller.findByGym(gymId);

      expect(result).toEqual(mockCourses);
      expect(service.findByGym).toHaveBeenCalledWith(gymId);
    });
  });

  describe('findByCoach', () => {
    it('should return courses for a specific coach', async () => {
      const mockCourses = CourseTestHelper.createMockCourseArray();
      const coachId = CourseTestHelper.createMockCoach().id;

      jest.spyOn(service, 'findByCoach').mockResolvedValue(mockCourses);

      const result = await controller.findByCoach(coachId);

      expect(result).toEqual(mockCourses);
      expect(service.findByCoach).toHaveBeenCalledWith(coachId);
    });
  });
});
