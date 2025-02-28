"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const config_service_1 = require("../config/config.service");
const users_service_1 = require("../modules/users/users.service");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = require("bcrypt");
async function seed() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_service_1.ConfigService);
    const usersService = app.get(users_service_1.UsersService);
    try {
        const adminPassword = await bcrypt.hash('admin123', configService.security.bcryptSaltRounds);
        await usersService.create({
            email: 'admin@gymapp.com',
            password: adminPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: user_entity_1.UserRole.ADMIN,
            isActive: true,
        });
        console.log('✅ Admin user created');
        const coachPassword = await bcrypt.hash('coach123', configService.security.bcryptSaltRounds);
        await usersService.create({
            email: 'coach@gymapp.com',
            password: coachPassword,
            firstName: 'Coach',
            lastName: 'User',
            role: user_entity_1.UserRole.COACH,
            isActive: true,
        });
        console.log('✅ Coach user created');
        const clientPassword = await bcrypt.hash('client123', configService.security.bcryptSaltRounds);
        await usersService.create({
            email: 'client@gymapp.com',
            password: clientPassword,
            firstName: 'Client',
            lastName: 'User',
            role: user_entity_1.UserRole.CLIENT,
            isActive: true,
        });
        console.log('✅ Client user created');
        console.log('🌱 Seeding completed successfully');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
    }
    finally {
        await app.close();
    }
}
seed();
//# sourceMappingURL=seed.js.map