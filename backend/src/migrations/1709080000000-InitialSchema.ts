import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1709080000000 implements MigrationInterface {
    name = 'InitialSchema1709080000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create gyms table
        await queryRunner.query(`
            CREATE TABLE gyms (
                id VARCHAR(36) NOT NULL,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                phone VARCHAR(255),
                email VARCHAR(255),
                createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id)
            ) ENGINE=InnoDB
        `);

        // Create users table
        await queryRunner.query(`
            CREATE TABLE users (
                id VARCHAR(36) NOT NULL,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'coach', 'client') NOT NULL DEFAULT 'client',
                profilePicture VARCHAR(255),
                gymId VARCHAR(36),
                isActive BOOLEAN NOT NULL DEFAULT true,
                currentHashedRefreshToken VARCHAR(255),
                createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id),
                FOREIGN KEY (gymId) REFERENCES gyms(id) ON DELETE SET NULL
            ) ENGINE=InnoDB
        `);

        // Create courses table
        await queryRunner.query(`
            CREATE TABLE courses (
                id VARCHAR(36) NOT NULL,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                duration INT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                gymId VARCHAR(36),
                createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id),
                FOREIGN KEY (gymId) REFERENCES gyms(id) ON DELETE CASCADE
            ) ENGINE=InnoDB
        `);

        // Create trainings table
        await queryRunner.query(`
            CREATE TABLE trainings (
                id VARCHAR(36) NOT NULL,
                startTime TIMESTAMP NOT NULL,
                endTime TIMESTAMP NOT NULL,
                status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
                notes TEXT,
                clientId VARCHAR(36) NOT NULL,
                coachId VARCHAR(36) NOT NULL,
                courseId VARCHAR(36),
                createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id),
                FOREIGN KEY (clientId) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (coachId) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE SET NULL
            ) ENGINE=InnoDB
        `);

        // Create exercises table
        await queryRunner.query(`
            CREATE TABLE exercises (
                id VARCHAR(36) NOT NULL,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                type VARCHAR(255) NOT NULL,
                difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
                equipment VARCHAR(255),
                instructions TEXT,
                createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id)
            ) ENGINE=InnoDB
        `);

        // Create nutrition table
        await queryRunner.query(`
            CREATE TABLE nutrition (
                id VARCHAR(36) NOT NULL,
                name VARCHAR(255) NOT NULL,
                type ENUM('meal', 'supplement') NOT NULL,
                description TEXT,
                calories INT,
                protein DECIMAL(10,2),
                carbs DECIMAL(10,2),
                fats DECIMAL(10,2),
                instructions TEXT,
                createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id)
            ) ENGINE=InnoDB
        `);

        // Create promotions table
        await queryRunner.query(`
            CREATE TABLE promotions (
                id VARCHAR(36) NOT NULL,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                discountPercentage DECIMAL(5,2) NOT NULL,
                startDate TIMESTAMP NOT NULL,
                endDate TIMESTAMP NOT NULL,
                code VARCHAR(255) UNIQUE,
                gymId VARCHAR(36),
                createdAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id),
                FOREIGN KEY (gymId) REFERENCES gyms(id) ON DELETE CASCADE
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE promotions`);
        await queryRunner.query(`DROP TABLE nutrition`);
        await queryRunner.query(`DROP TABLE exercises`);
        await queryRunner.query(`DROP TABLE trainings`);
        await queryRunner.query(`DROP TABLE courses`);
        await queryRunner.query(`DROP TABLE users`);
        await queryRunner.query(`DROP TABLE gyms`);
    }
}
