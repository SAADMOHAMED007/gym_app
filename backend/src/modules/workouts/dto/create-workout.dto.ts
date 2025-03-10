import { IsString, IsNotEmpty, IsOptional, IsDateString, IsInt, IsBoolean, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExerciseSetDto {
  @IsInt()
  @IsNotEmpty()
  setNumber: number;

  @IsOptional()
  @IsInt()
  reps?: number;

  @IsOptional()
  weight?: number;

  @IsOptional()
  @IsInt()
  durationSeconds?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

export class CreateWorkoutExerciseDto {
  @IsUUID()
  @IsNotEmpty()
  exerciseId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseSetDto)
  sets: CreateExerciseSetDto[];
}

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsInt()
  durationMinutes?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutExerciseDto)
  exercises?: CreateWorkoutExerciseDto[];
} 