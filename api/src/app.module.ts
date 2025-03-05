import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { StoryModule } from './story/story.module';
import { VocabularyStatisticsModule } from './vocabulary_statistics/vocabulary_statistics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterModule } from './character/character.module';
import { UserModule } from './auth/user/user.module';
import { RoleModule } from './auth/role/role.module';
import { PermissionModule } from './auth/permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './auth/user/user.service';
import { UserController } from './auth/user/user.controller';


@Module({
  imports: [
    VocabularyModule, 
    StoryModule, 
    VocabularyStatisticsModule,



    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'chinese',
      autoLoadEntities: true,
      synchronize: false
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'environment.env'
    }),
    CharacterModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
