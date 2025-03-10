import { IsString, IsOptional, IsDateString, IsInt, IsBoolean, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateExerciseSetDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsInt()
  @IsOptional()
  setNumber?: number;

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

export class UpdateWorkoutExerciseDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @IsOptional()
  exerciseId?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateExerciseSetDto)
  sets?: UpdateExerciseSetDto[];
}

export class UpdateWorkoutDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsOptional()
  @IsInt()
  durationMinutes?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkoutExerciseDto)
  exercises?: UpdateWorkoutExerciseDto[];
} 