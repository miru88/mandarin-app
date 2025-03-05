import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {  ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserModule } from './user/user.module';
// import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt.auth.guard';


@Global()
@Module({
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy, 
    JwtAuthGuard,
    RolesGuard,
    // If you want a global guard, it should be JwtAuthGuard first, then RolesGuard
    // But I recommend not using global guards until basic auth is working
    // {provide: APP_GUARD, useClass: JwtAuthGuard},
    // {provide: APP_GUARD, useClass: RolesGuard}
  ],
  controllers: [AuthController],
  exports: [AuthService, RolesGuard, JwtAuthGuard],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '1h'}
      })
    }),
  ]
})
export class AuthModule {}