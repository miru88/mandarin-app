import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {  ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserModule } from './user/user.module';
// import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';


@Global()
@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    // UserModule, - Not needed since it's global
    PassportModule,
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