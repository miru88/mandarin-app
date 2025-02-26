"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyModule = void 0;
const common_1 = require("@nestjs/common");
const vocabulary_controller_1 = require("./vocabulary.controller");
const vocabulary_service_1 = require("./vocabulary.service");
const typeorm_1 = require("@nestjs/typeorm");
const vocabulary_entity_1 = require("./entities/vocabulary.entity");
let VocabularyModule = class VocabularyModule {
};
exports.VocabularyModule = VocabularyModule;
exports.VocabularyModule = VocabularyModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vocabulary_entity_1.Vocabulary])],
        controllers: [vocabulary_controller_1.VocabularyController],
        providers: [vocabulary_service_1.VocabularyService],
        exports: [vocabulary_service_1.VocabularyService]
    })
], VocabularyModule);
//# sourceMappingURL=vocabulary.module.js.map