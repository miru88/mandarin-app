import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
    sub: string;
    username: string;
    roles: string[];
    permissions: string[];
    iat?: number;//issued at
    exp?: number;//expiration
  }
  
  export interface JwtUser {
    userId: string;
    username: string;
    roles: string[];
    permissions: string[];
  }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(payload: JwtPayload): Promise<JwtUser> {
        return {
            userId: payload.sub, 
            username: payload.username,
            roles: payload.roles,
            permissions: payload.permissions,
        }
    }
}