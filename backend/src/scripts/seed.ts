import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ConfigService } from '../config/config.service';
import { UsersService } from '../modules/users/users.service';
import { UserRole } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const usersService = app.get(UsersService);

  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', configService.security.bcryptSaltRounds);
    await usersService.create({
      email: 'admin@gymapp.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      isActive: true,
    });
    console.log('✅ Admin user created');

    // Create coach user
    const coachPassword = await bcrypt.hash('coach123', configService.security.bcryptSaltRounds);
    await usersService.create({
      email: 'coach@gymapp.com',
      password: coachPassword,
      firstName: 'Coach',
      lastName: 'User',
      role: UserRole.COACH,
      isActive: true,
    });
    console.log('✅ Coach user created');

    // Create client user
    const clientPassword = await bcrypt.hash('client123', configService.security.bcryptSaltRounds);
    await usersService.create({
      email: 'client@gymapp.com',
      password: clientPassword,
      firstName: 'Client',
      lastName: 'User',
      role: UserRole.CLIENT,
      isActive: true,
    });
    console.log('✅ Client user created');

    console.log('🌱 Seeding completed successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

seed();
