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
exports.Character = void 0;
const typeorm_1 = require("typeorm");
let Character = class Character {
};
exports.Character = Character;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Character.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1, nullable: false }),
    __metadata("design:type", String)
], Character.prototype, "chinese", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Character.prototype, "pinyin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdDate', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Character.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedDate', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Character.prototype, "updatedDate", void 0);
exports.Character = Character = __decorate([
    (0, typeorm_1.Entity)()
], Character);
//# sourceMappingURL=character.entity.js.map