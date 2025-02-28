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
exports.Nutrition = exports.DietType = exports.MealType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const gym_entity_1 = require("./gym.entity");
var MealType;
(function (MealType) {
    MealType["BREAKFAST"] = "breakfast";
    MealType["LUNCH"] = "lunch";
    MealType["DINNER"] = "dinner";
    MealType["SNACK"] = "snack";
    MealType["PRE_WORKOUT"] = "pre_workout";
    MealType["POST_WORKOUT"] = "post_workout";
})(MealType || (exports.MealType = MealType = {}));
var DietType;
(function (DietType) {
    DietType["REGULAR"] = "regular";
    DietType["VEGETARIAN"] = "vegetarian";
    DietType["VEGAN"] = "vegan";
    DietType["KETO"] = "keto";
    DietType["PALEO"] = "paleo";
    DietType["LOW_CARB"] = "low_carb";
    DietType["HIGH_PROTEIN"] = "high_protein";
})(DietType || (exports.DietType = DietType = {}));
let Nutrition = class Nutrition {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, dietType: { required: true, enum: require("./nutrition.entity").DietType }, meals: { required: true }, allergies: { required: true, type: () => [String] }, restrictions: { required: true, type: () => [String] }, guidelines: { required: true, type: () => String }, supplements: { required: true, type: () => [String] }, durationWeeks: { required: true, type: () => Number }, client: { required: true, type: () => require("./user.entity").User }, clientId: { required: true, type: () => String }, nutritionist: { required: true, type: () => require("./user.entity").User }, nutritionistId: { required: true, type: () => String }, gym: { required: true, type: () => require("./gym.entity").Gym }, gymId: { required: true, type: () => String }, progress: { required: true }, isActive: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, adherenceRate: { required: true, type: () => Number }, weightChange: { required: true, type: () => Number }, goals: { required: true } };
    }
};
exports.Nutrition = Nutrition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Nutrition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Nutrition.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Nutrition.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DietType,
        default: DietType.REGULAR,
    }),
    __metadata("design:type", String)
], Nutrition.prototype, "dietType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Array)
], Nutrition.prototype, "meals", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], Nutrition.prototype, "nutritionalInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Nutrition.prototype, "allergies", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Nutrition.prototype, "restrictions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Nutrition.prototype, "guidelines", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Nutrition.prototype, "supplements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Nutrition.prototype, "durationWeeks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Nutrition.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Nutrition.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Nutrition.prototype, "nutritionist", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Nutrition.prototype, "nutritionistId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gym_entity_1.Gym),
    __metadata("design:type", gym_entity_1.Gym)
], Nutrition.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Nutrition.prototype, "gymId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Nutrition.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Nutrition.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Nutrition.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Nutrition.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Nutrition.prototype, "adherenceRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Nutrition.prototype, "weightChange", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Nutrition.prototype, "goals", void 0);
exports.Nutrition = Nutrition = __decorate([
    (0, typeorm_1.Entity)('nutrition_plans')
], Nutrition);
//# sourceMappingURL=nutrition.entity.js.map