import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { Course } from '../../entities/course.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('courses')
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Return all courses.', type: [Course] })
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get a course by id' })
  @ApiResponse({ status: 200, description: 'Return the course.', type: Course })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.COACH)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'The course has been created.', type: Course })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body(new ValidationPipe({ transform: true })) createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    return this.courseService.create(createCourseDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.COACH)
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({ status: 200, description: 'The course has been updated.', type: Course })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ transform: true })) updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({ status: 200, description: 'The course has been deleted.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.courseService.delete(id);
  }

  @Get('gym/:gymId')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get all courses for a gym' })
  @ApiResponse({ status: 200, description: 'Return all courses for the gym.', type: [Course] })
  async findByGym(@Param('gymId', ParseUUIDPipe) gymId: string): Promise<Course[]> {
    return this.courseService.findByGym(gymId);
  }

  @Get('coach/:coachId')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get all courses for a coach' })
  @ApiResponse({ status: 200, description: 'Return all courses for the coach.', type: [Course] })
  async findByCoach(@Param('coachId', ParseUUIDPipe) coachId: string): Promise<Course[]> {
    return this.courseService.findByCoach(coachId);
  }
}
