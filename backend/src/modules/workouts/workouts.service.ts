import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout, WorkoutExercise, ExerciseSet, Exercise } from '../../entities';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>,
    @InjectRepository(WorkoutExercise)
    private workoutExercisesRepository: Repository<WorkoutExercise>,
    @InjectRepository(ExerciseSet)
    private exerciseSetsRepository: Repository<ExerciseSet>,
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
  ) {}

  async findAll(userId: string): Promise<Workout[]> {
    return this.workoutsRepository.find({
      where: { userId },
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Workout> {
    const workout = await this.workoutsRepository.findOne({
      where: { id, userId },
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    return workout;
  }

  async create(createWorkoutDto: CreateWorkoutDto, userId: string): Promise<Workout> {
    const workout = this.workoutsRepository.create({
      ...createWorkoutDto,
      userId,
      exercises: [],
    });

    const savedWorkout = await this.workoutsRepository.save(workout);

    if (createWorkoutDto.exercises && createWorkoutDto.exercises.length > 0) {
      const exercises = await this.processExercises(createWorkoutDto.exercises, savedWorkout.id);
      savedWorkout.exercises = exercises;
    }

    return savedWorkout;
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto, userId: string): Promise<Workout> {
    const workout = await this.findOne(id, userId);

    // Update basic workout properties
    if (updateWorkoutDto.name) workout.name = updateWorkoutDto.name;
    if (updateWorkoutDto.description !== undefined) workout.description = updateWorkoutDto.description;
    if (updateWorkoutDto.date) workout.date = new Date(updateWorkoutDto.date);
    if (updateWorkoutDto.durationMinutes) workout.durationMinutes = updateWorkoutDto.durationMinutes;
    if (updateWorkoutDto.isCompleted !== undefined) workout.isCompleted = updateWorkoutDto.isCompleted;

    // Handle exercises if provided
    if (updateWorkoutDto.exercises) {
      await this.updateExercises(workout, updateWorkoutDto.exercises);
    }

    return this.workoutsRepository.save(workout);
  }

  async remove(id: string, userId: string): Promise<void> {
    const workout = await this.findOne(id, userId);
    await this.workoutsRepository.remove(workout);
  }

  private async processExercises(exerciseDtos: any[], workoutId: string): Promise<WorkoutExercise[]> {
    const exercises: WorkoutExercise[] = [];

    for (const exerciseDto of exerciseDtos) {
      // Verify the exercise exists
      const exercise = await this.exercisesRepository.findOne({
        where: { id: exerciseDto.exerciseId },
      });

      if (!exercise) {
        throw new BadRequestException(`Exercise with ID ${exerciseDto.exerciseId} not found`);
      }

      // Create workout exercise
      const workoutExercise = this.workoutExercisesRepository.create({
        workoutId,
        exerciseId: exerciseDto.exerciseId,
        name: exerciseDto.name || exercise.name,
        imageUrl: exerciseDto.imageUrl,
        notes: exerciseDto.notes,
        isCompleted: exerciseDto.isCompleted || false,
        sets: [],
      });

      const savedWorkoutExercise = await this.workoutExercisesRepository.save(workoutExercise);

      // Process sets
      if (exerciseDto.sets && exerciseDto.sets.length > 0) {
        const sets = await this.processSets(exerciseDto.sets, savedWorkoutExercise.id);
        savedWorkoutExercise.sets = sets;
      }

      exercises.push(savedWorkoutExercise);
    }

    return exercises;
  }

  private async processSets(setDtos: any[], workoutExerciseId: string): Promise<ExerciseSet[]> {
    const sets: ExerciseSet[] = [];

    for (const setDto of setDtos) {
      const set = this.exerciseSetsRepository.create({
        workoutExerciseId,
        setNumber: setDto.setNumber,
        weight: setDto.weight,
        reps: setDto.reps,
        durationSeconds: setDto.durationSeconds,
        isCompleted: setDto.isCompleted || false,
      });

      const savedSet = await this.exerciseSetsRepository.save(set);
      sets.push(savedSet);
    }

    return sets;
  }

  private async updateExercises(workout: Workout, exerciseDtos: any[]): Promise<void> {
    // Handle existing exercises
    const existingExerciseIds = workout.exercises.map(e => e.id);
    const updatedExerciseIds = exerciseDtos.filter(e => e.id).map(e => e.id);

    // Remove exercises that are not in the updated list
    const exercisesToRemove = workout.exercises.filter(e => !updatedExerciseIds.includes(e.id));
    for (const exercise of exercisesToRemove) {
      await this.workoutExercisesRepository.remove(exercise);
    }

    // Update or create exercises
    for (const exerciseDto of exerciseDtos) {
      if (exerciseDto.id && existingExerciseIds.includes(exerciseDto.id)) {
        // Update existing exercise
        const existingExercise = workout.exercises.find(e => e.id === exerciseDto.id);
        
        if (exerciseDto.name) existingExercise.name = exerciseDto.name;
        if (exerciseDto.imageUrl !== undefined) existingExercise.imageUrl = exerciseDto.imageUrl;
        if (exerciseDto.notes !== undefined) existingExercise.notes = exerciseDto.notes;
        if (exerciseDto.isCompleted !== undefined) existingExercise.isCompleted = exerciseDto.isCompleted;
        
        await this.workoutExercisesRepository.save(existingExercise);

        // Handle sets if provided
        if (exerciseDto.sets) {
          await this.updateSets(existingExercise, exerciseDto.sets);
        }
      } else {
        // Create new exercise
        const newExercises = await this.processExercises([exerciseDto], workout.id);
        workout.exercises = [...workout.exercises.filter(e => !exercisesToRemove.includes(e)), ...newExercises];
      }
    }
  }

  private async updateSets(workoutExercise: WorkoutExercise, setDtos: any[]): Promise<void> {
    // Handle existing sets
    const existingSetIds = workoutExercise.sets.map(s => s.id);
    const updatedSetIds = setDtos.filter(s => s.id).map(s => s.id);

    // Remove sets that are not in the updated list
    const setsToRemove = workoutExercise.sets.filter(s => !updatedSetIds.includes(s.id));
    for (const set of setsToRemove) {
      await this.exerciseSetsRepository.remove(set);
    }

    // Update or create sets
    for (const setDto of setDtos) {
      if (setDto.id && existingSetIds.includes(setDto.id)) {
        // Update existing set
        const existingSet = workoutExercise.sets.find(s => s.id === setDto.id);
        
        if (setDto.setNumber) existingSet.setNumber = setDto.setNumber;
        if (setDto.weight !== undefined) existingSet.weight = setDto.weight;
        if (setDto.reps !== undefined) existingSet.reps = setDto.reps;
        if (setDto.durationSeconds !== undefined) existingSet.durationSeconds = setDto.durationSeconds;
        if (setDto.isCompleted !== undefined) existingSet.isCompleted = setDto.isCompleted;
        
        await this.exerciseSetsRepository.save(existingSet);
      } else {
        // Create new set
        const newSets = await this.processSets([setDto], workoutExercise.id);
        workoutExercise.sets = [...workoutExercise.sets.filter(s => !setsToRemove.includes(s)), ...newSets];
      }
    }
  }
} 