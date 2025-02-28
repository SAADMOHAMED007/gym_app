import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsEnum, 
  IsNumber, 
  IsArray, 
  ValidateNested, 
  IsBoolean,
  IsOptional,
  Min,
  IsUUID,
  Matches,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CourseType, CourseLevel } from '../../../entities/course.entity';

class ScheduleItemDto {
  @ApiProperty({ example: 'Monday', description: 'Day of the week' })
  @IsString()
  day: string;

  @ApiProperty({ example: true, description: 'Whether the course is active on this day' })
  @IsBoolean()
  isActive: boolean;
}

export class CreateCourseDto {
  @ApiProperty({ example: 'Yoga Basics', description: 'Name of the course' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Introduction to basic yoga poses', description: 'Course description' })
  @IsString()
  description: string;

  @ApiProperty({ enum: CourseType, example: CourseType.GROUP, description: 'Type of course' })
  @IsEnum(CourseType)
  type: CourseType;

  @ApiProperty({ enum: CourseLevel, example: CourseLevel.BEGINNER, description: 'Course difficulty level' })
  @IsEnum(CourseLevel)
  level: CourseLevel;

  @ApiProperty({ example: 20, description: 'Maximum number of participants' })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({ example: 100, description: 'Course price' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: '09:00', description: 'Course start time (HH:MM)' })
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in HH:MM format',
  })
  startTime: string;

  @ApiProperty({ example: '10:00', description: 'Course end time (HH:MM)' })
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'End time must be in HH:MM format',
  })
  endTime: string;

  @ApiProperty({ 
    type: [ScheduleItemDto], 
    example: [{ day: 'Monday', isActive: true }], 
    description: 'Course schedule' 
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ScheduleItemDto)
  schedule: ScheduleItemDto[];

  @ApiProperty({ example: 'uuid', description: 'ID of the gym where the course is held' })
  @IsUUID()
  gymId: string;

  @ApiProperty({ example: 'uuid', description: 'ID of the coach teaching the course' })
  @IsUUID()
  coachId: string;

  @ApiProperty({ example: 'course-image.jpg', description: 'Course image URL', required: false })
  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateCourseDto {
  @ApiProperty({ example: 'Yoga Basics', description: 'Name of the course', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Introduction to basic yoga poses', description: 'Course description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: CourseType, example: CourseType.GROUP, description: 'Type of course', required: false })
  @IsOptional()
  @IsEnum(CourseType)
  type?: CourseType;

  @ApiProperty({ enum: CourseLevel, example: CourseLevel.BEGINNER, description: 'Course difficulty level', required: false })
  @IsOptional()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @ApiProperty({ example: 20, description: 'Maximum number of participants', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @ApiProperty({ example: 100, description: 'Course price', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ example: '09:00', description: 'Course start time (HH:MM)', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in HH:MM format',
  })
  startTime?: string;

  @ApiProperty({ example: '10:00', description: 'Course end time (HH:MM)', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'End time must be in HH:MM format',
  })
  endTime?: string;

  @ApiProperty({ 
    type: [ScheduleItemDto], 
    example: [{ day: 'Monday', isActive: true }], 
    description: 'Course schedule',
    required: false
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ScheduleItemDto)
  schedule?: ScheduleItemDto[];

  @ApiProperty({ example: 'uuid', description: 'ID of the gym where the course is held', required: false })
  @IsOptional()
  @IsUUID()
  gymId?: string;

  @ApiProperty({ example: 'uuid', description: 'ID of the coach teaching the course', required: false })
  @IsOptional()
  @IsUUID()
  coachId?: string;

  @ApiProperty({ example: 'course-image.jpg', description: 'Course image URL', required: false })
  @IsOptional()
  @IsString()
  image?: string;
}
