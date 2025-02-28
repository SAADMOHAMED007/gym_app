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
exports.Training = exports.TrainingStatus = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const course_entity_1 = require("./course.entity");
var TrainingStatus;
(function (TrainingStatus) {
    TrainingStatus["SCHEDULED"] = "scheduled";
    TrainingStatus["IN_PROGRESS"] = "in_progress";
    TrainingStatus["COMPLETED"] = "completed";
    TrainingStatus["CANCELLED"] = "cancelled";
})(TrainingStatus || (exports.TrainingStatus = TrainingStatus = {}));
let Training = class Training {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, client: { required: true, type: () => require("./user.entity").User }, clientId: { required: true, type: () => String }, coach: { required: true, type: () => require("./user.entity").User }, coachId: { required: true, type: () => String }, course: { required: true, type: () => require("./course.entity").Course }, courseId: { required: true, type: () => String }, status: { required: true, enum: require("./training.entity").TrainingStatus }, scheduledDate: { required: true, type: () => Date }, duration: { required: true, type: () => Number }, exercises: { required: true }, notes: { required: true, type: () => String }, rating: { required: true, type: () => Number }, feedback: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, isCompleted: { required: true, type: () => Boolean }, completedAt: { required: true, type: () => Date }, isCancelled: { required: true, type: () => Boolean }, cancelledAt: { required: true, type: () => Date } };
    }
};
exports.Training = Training;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Training.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.clientTrainings),
    __metadata("design:type", user_entity_1.User)
], Training.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Training.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.coachTrainings),
    __metadata("design:type", user_entity_1.User)
], Training.prototype, "coach", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Training.prototype, "coachId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, course => course.trainings),
    __metadata("design:type", course_entity_1.Course)
], Training.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Training.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TrainingStatus,
        default: TrainingStatus.SCHEDULED,
    }),
    __metadata("design:type", String)
], Training.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Training.prototype, "scheduledDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Training.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Training.prototype, "exercises", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Training.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 1, nullable: true }),
    __metadata("design:type", Number)
], Training.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Training.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Training.prototype, "metrics", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Training.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Training.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Training.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Training.prototype, "isCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Training.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Training.prototype, "isCancelled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Training.prototype, "cancelledAt", void 0);
exports.Training = Training = __decorate([
    (0, typeorm_1.Entity)('trainings')
], Training);
//# sourceMappingURL=training.entity.js.map