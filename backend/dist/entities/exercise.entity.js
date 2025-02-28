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
exports.Exercise = exports.MuscleGroup = exports.ExerciseLevel = exports.ExerciseType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const gym_entity_1 = require("./gym.entity");
var ExerciseType;
(function (ExerciseType) {
    ExerciseType["STRENGTH"] = "strength";
    ExerciseType["CARDIO"] = "cardio";
    ExerciseType["FLEXIBILITY"] = "flexibility";
    ExerciseType["BALANCE"] = "balance";
})(ExerciseType || (exports.ExerciseType = ExerciseType = {}));
var ExerciseLevel;
(function (ExerciseLevel) {
    ExerciseLevel["BEGINNER"] = "beginner";
    ExerciseLevel["INTERMEDIATE"] = "intermediate";
    ExerciseLevel["ADVANCED"] = "advanced";
})(ExerciseLevel || (exports.ExerciseLevel = ExerciseLevel = {}));
var MuscleGroup;
(function (MuscleGroup) {
    MuscleGroup["CHEST"] = "chest";
    MuscleGroup["BACK"] = "back";
    MuscleGroup["SHOULDERS"] = "shoulders";
    MuscleGroup["ARMS"] = "arms";
    MuscleGroup["LEGS"] = "legs";
    MuscleGroup["CORE"] = "core";
    MuscleGroup["FULL_BODY"] = "full_body";
})(MuscleGroup || (exports.MuscleGroup = MuscleGroup = {}));
let Exercise = class Exercise {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, type: { required: true, enum: require("./exercise.entity").ExerciseType }, level: { required: true, enum: require("./exercise.entity").ExerciseLevel }, primaryMuscleGroup: { required: true, enum: require("./exercise.entity").MuscleGroup }, secondaryMuscleGroups: { required: true, enum: require("./exercise.entity").MuscleGroup, isArray: true }, instructions: { required: true, type: () => String }, tips: { required: true, type: () => [String] }, images: { required: true, type: () => [String] }, videoUrl: { required: true, type: () => String }, equipment: { required: true }, recommendedSets: { required: true, type: () => Number }, recommendedReps: { required: true, type: () => Number }, recommendedDuration: { required: true, type: () => Number }, recommendedRest: { required: true, type: () => Number }, caloriesBurn: { required: true, type: () => Number }, gym: { required: true, type: () => require("./gym.entity").Gym }, gymId: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Exercise = Exercise;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exercise.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Exercise.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ExerciseType,
        default: ExerciseType.STRENGTH,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ExerciseLevel,
        default: ExerciseLevel.BEGINNER,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MuscleGroup,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "primaryMuscleGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Exercise.prototype, "secondaryMuscleGroups", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Exercise.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Exercise.prototype, "tips", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Exercise.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Exercise.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Exercise.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Exercise.prototype, "recommendedSets", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Exercise.prototype, "recommendedReps", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Exercise.prototype, "recommendedDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Exercise.prototype, "recommendedRest", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Exercise.prototype, "caloriesBurn", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gym_entity_1.Gym, gym => gym.exercises),
    __metadata("design:type", gym_entity_1.Gym)
], Exercise.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exercise.prototype, "gymId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Exercise.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Exercise.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Exercise.prototype, "updatedAt", void 0);
exports.Exercise = Exercise = __decorate([
    (0, typeorm_1.Entity)('exercises')
], Exercise);
//# sourceMappingURL=exercise.entity.js.map