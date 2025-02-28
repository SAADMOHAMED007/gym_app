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
exports.User = exports.UserRole = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const gym_entity_1 = require("./gym.entity");
const training_entity_1 = require("./training.entity");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["COACH"] = "coach";
    UserRole["CLIENT"] = "client";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, enum: require("./user.entity").UserRole }, profilePicture: { required: true, type: () => String }, gym: { required: true, type: () => require("./gym.entity").Gym }, gymId: { required: true, type: () => String }, clientTrainings: { required: true, type: () => [require("./training.entity").Training] }, coachTrainings: { required: true, type: () => [require("./training.entity").Training] }, isActive: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, currentHashedRefreshToken: { required: false, type: () => String } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CLIENT,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gym_entity_1.Gym, gym => gym.users, { nullable: true }),
    __metadata("design:type", gym_entity_1.Gym)
], User.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gymId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => training_entity_1.Training, training => training.client),
    __metadata("design:type", Array)
], User.prototype, "clientTrainings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => training_entity_1.Training, training => training.coach),
    __metadata("design:type", Array)
], User.prototype, "coachTrainings", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "currentHashedRefreshToken", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map