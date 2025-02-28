import { Repository } from 'typeorm';
import { Course } from '../../entities/course.entity';
import { CreateCourseDto, UpdateCourseDto } from './dto';
export declare class CourseService {
    private readonly courseRepository;
    constructor(courseRepository: Repository<Course>);
    findAll(): Promise<Course[]>;
    findByGym(gymId: string): Promise<Course[]>;
    findByCoach(coachId: string): Promise<Course[]>;
    findOne(id: string): Promise<Course>;
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    delete(id: string): Promise<void>;
    updateEnrollmentCount(id: string, increment: boolean): Promise<Course>;
    updateCompletedSessions(id: string): Promise<Course>;
    updateAverageRating(id: string, newRating: number): Promise<Course>;
}
