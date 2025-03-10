import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('workouts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The workout has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  async create(@Body() createWorkoutDto: CreateWorkoutDto, @Request() req) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Workout created successfully',
      data: await this.workoutsService.create(createWorkoutDto, req.user.id),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all workouts for the current user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all workouts.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  async findAll(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Workouts retrieved successfully',
      data: await this.workoutsService.findAll(req.user.id),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a workout by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the workout.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Workout not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  async findOne(@Param('id') id: string, @Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Workout retrieved successfully',
      data: await this.workoutsService.findOne(id, req.user.id),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workout' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The workout has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Workout not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  async update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto, @Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Workout updated successfully',
      data: await this.workoutsService.update(id, updateWorkoutDto, req.user.id),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workout' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The workout has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Workout not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.workoutsService.remove(id, req.user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Workout deleted successfully',
    };
  }
} 