"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const vocabulary_module_1 = require("./vocabulary/vocabulary.module");
const story_module_1 = require("./story/story.module");
const vocabulary_statistics_module_1 = require("./vocabulary_statistics/vocabulary_statistics.module");
const typeorm_1 = require("@nestjs/typeorm");
const character_module_1 = require("./character/character.module");
const user_module_1 = require("./auth/user/user.module");
const role_module_1 = require("./auth/role/role.module");
const permission_module_1 = require("./auth/permission/permission.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const user_service_1 = require("./auth/user/user.service");
const user_controller_1 = require("./auth/user/user.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            vocabulary_module_1.VocabularyModule,
            story_module_1.StoryModule,
            vocabulary_statistics_module_1.VocabularyStatisticsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'root',
                database: 'chinese',
                autoLoadEntities: true,
                synchronize: false
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'environment.env'
            }),
            character_module_1.CharacterModule,
            user_module_1.UserModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController],
        providers: [app_service_1.AppService, user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map