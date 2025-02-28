import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../../entities/course.entity';
import { CreateCourseDto, UpdateCourseDto } from './dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: ['gym', 'coach', 'trainings'],
    });
  }

  async findByGym(gymId: string): Promise<Course[]> {
    return this.courseRepository.find({
      where: { gymId },
      relations: ['gym', 'coach', 'trainings'],
    });
  }

  async findByCoach(coachId: string): Promise<Course[]> {
    return this.courseRepository.find({
      where: { coachId },
      relations: ['gym', 'coach', 'trainings'],
    });
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['gym', 'coach', 'trainings'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create({
      ...createCourseDto,
      enrolledStudents: 0,
      completedSessions: 0,
      averageRating: 0,
      isActive: true,
    });

    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }

    // Validate time format if provided
    if (updateCourseDto.startTime || updateCourseDto.endTime) {
      const startTime = updateCourseDto.startTime || course.startTime;
      const endTime = updateCourseDto.endTime || course.endTime;
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);

      if (end <= start) {
        throw new BadRequestException('End time must be after start time');
      }
    }

    // Update the course
    Object.assign(course, updateCourseDto);
    return this.courseRepository.save(course);
  }

  async delete(id: string): Promise<void> {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }

    await this.courseRepository.delete(id);
  }

  async updateEnrollmentCount(id: string, increment: boolean): Promise<Course> {
    const course = await this.findOne(id);

    if (increment && course.enrolledStudents >= course.capacity) {
      throw new BadRequestException('Course is at maximum capacity');
    }

    course.enrolledStudents += increment ? 1 : -1;
    return this.courseRepository.save(course);
  }

  async updateCompletedSessions(id: string): Promise<Course> {
    const course = await this.findOne(id);
    course.completedSessions += 1;
    return this.courseRepository.save(course);
  }

  async updateAverageRating(id: string, newRating: number): Promise<Course> {
    const course = await this.findOne(id);
    const currentTotal = course.averageRating * course.completedSessions;
    const newTotal = currentTotal + newRating;
    course.averageRating = newTotal / (course.completedSessions + 1);
    return this.courseRepository.save(course);
  }
}
