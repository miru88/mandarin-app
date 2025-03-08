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
exports.StoryModule = void 0;
const common_1 = require("@nestjs/common");
const story_controller_1 = require("./story.controller");
const story_service_1 = require("./story.service");
const typeorm_1 = require("@nestjs/typeorm");
const story_entity_1 = require("./story.entity");
let StoryModule = class StoryModule {
    constructor(storyService) {
        this.storyService = storyService;
    }
};
exports.StoryModule = StoryModule;
exports.StoryModule = StoryModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([story_entity_1.Story])],
        controllers: [story_controller_1.StoryController],
        exports: [typeorm_1.TypeOrmModule.forFeature([story_entity_1.Story]), story_service_1.StoryService],
        providers: [story_service_1.StoryService]
    }),
    __metadata("design:paramtypes", [story_service_1.StoryService])
], StoryModule);
//# sourceMappingURL=story.module.js.map