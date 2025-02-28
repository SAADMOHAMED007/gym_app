import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { Course } from '../../entities/course.entity';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    findAll(): Promise<Course[]>;
    findOne(id: string): Promise<Course>;
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    delete(id: string): Promise<void>;
    findByGym(gymId: string): Promise<Course[]>;
    findByCoach(coachId: string): Promise<Course[]>;
}
