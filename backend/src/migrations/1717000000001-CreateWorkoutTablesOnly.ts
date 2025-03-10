import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkoutTablesOnly1717000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if workouts table exists
    const workoutsTableExists = await queryRunner.hasTable('workouts');
    if (!workoutsTableExists) {
      // Create workouts table
      await queryRunner.query(`
        CREATE TABLE workouts (
          id VARCHAR(36) NOT NULL,
          name VARCHAR(255) NOT NULL,
          description TEXT NULL,
          date TIMESTAMP NOT NULL,
          durationMinutes INT NOT NULL DEFAULT 60,
          isCompleted TINYINT NOT NULL DEFAULT 0,
          userId VARCHAR(36) NOT NULL,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
    }

    // Check if workout_exercises table exists
    const workoutExercisesTableExists = await queryRunner.hasTable('workout_exercises');
    if (!workoutExercisesTableExists) {
      // Create workout_exercises table
      await queryRunner.query(`
        CREATE TABLE workout_exercises (
          id VARCHAR(36) NOT NULL,
          workoutId VARCHAR(36) NOT NULL,
          exerciseId VARCHAR(36) NOT NULL,
          name VARCHAR(255) NOT NULL,
          imageUrl VARCHAR(255) NULL,
          notes TEXT NULL,
          isCompleted TINYINT NOT NULL DEFAULT 0,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          FOREIGN KEY (workoutId) REFERENCES workouts(id) ON DELETE CASCADE,
          FOREIGN KEY (exerciseId) REFERENCES exercises(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
    }

    // Check if exercise_sets table exists
    const exerciseSetsTableExists = await queryRunner.hasTable('exercise_sets');
    if (!exerciseSetsTableExists) {
      // Create exercise_sets table
      await queryRunner.query(`
        CREATE TABLE exercise_sets (
          id VARCHAR(36) NOT NULL,
          workoutExerciseId VARCHAR(36) NOT NULL,
          setNumber INT NOT NULL,
          weight DECIMAL(10,2) NULL,
          reps INT NULL,
          durationSeconds INT NULL,
          isCompleted TINYINT NOT NULL DEFAULT 0,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          FOREIGN KEY (workoutExerciseId) REFERENCES workout_exercises(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS exercise_sets;`);
    await queryRunner.query(`DROP TABLE IF EXISTS workout_exercises;`);
    await queryRunner.query(`DROP TABLE IF EXISTS workouts;`);
  }
} 