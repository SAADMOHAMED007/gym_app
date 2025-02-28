"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gym = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const course_entity_1 = require("./course.entity");
const exercise_entity_1 = require("./exercise.entity");
const promotion_entity_1 = require("./promotion.entity");
let Gym = class Gym {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, address: { required: true, type: () => String }, phone: { required: true, type: () => String }, email: { required: true, type: () => String }, description: { required: true, type: () => String }, logo: { required: true, type: () => String }, coverImage: { required: true, type: () => String }, workingHours: { required: true }, amenities: { required: true, type: () => [String] }, users: { required: true, type: () => [require("./user.entity").User] }, courses: { required: true, type: () => [require("./course.entity").Course] }, exercises: { required: true, type: () => [require("./exercise.entity").Exercise] }, promotions: { required: true, type: () => [require("./promotion.entity").Promotion] }, isActive: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, totalMembers: { required: true, type: () => Number }, totalCoaches: { required: true, type: () => Number }, activeCourses: { required: true, type: () => Number } };
    }
};
exports.Gym = Gym;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Gym.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Gym.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Gym.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Gym.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Gym.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, user => user.gym),
    __metadata("design:type", Array)
], Gym.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_entity_1.Course, course => course.gym),
    __metadata("design:type", Array)
], Gym.prototype, "courses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercise_entity_1.Exercise, exercise => exercise.gym),
    __metadata("design:type", Array)
], Gym.prototype, "exercises", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => promotion_entity_1.Promotion, promotion => promotion.gym),
    __metadata("design:type", Array)
], Gym.prototype, "promotions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Gym.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Gym.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Gym.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Gym.prototype, "totalMembers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Gym.prototype, "totalCoaches", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Gym.prototype, "activeCourses", void 0);
exports.Gym = Gym = __decorate([
    (0, typeorm_1.Entity)('gyms')
], Gym);
//# sourceMappingURL=gym.entity.js.map