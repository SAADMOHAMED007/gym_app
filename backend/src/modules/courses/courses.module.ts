import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from '../../entities/course.entity';
import { CacheModule } from '../cache/cache.module'; // Import CacheModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    CacheModule, // Add CacheModule here
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CoursesModule {}
