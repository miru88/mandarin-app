import { Injectable, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './user/user.dto';

@Injectable()
export class AuthService {

    constructor(
      @Inject(forwardRef(() => UserService))
      private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
      ) {}
    
      async validateUser(username: string, password: string): Promise<Partial<User> | null>{

        const user = await this.userService.getOneByUsername(username);

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
          }

        return null;

      }

      async hashPassword(password: string): Promise<string> {
      const saltRounds = Number(this.configService.get('BCRYPT_SALT_ROUNDS')) || 10;
      return bcrypt.hash(password, saltRounds);
      }
    
      
      async login(user: LoginUserDto): Promise<{accessToken: string}> {

        const userFromDb: Partial<User> = await this.validateUser(user.username, user.password);
        const roles: string[] = userFromDb.roles.map(role => role.name);

        //each role has their permissions also included
        const permissions: string[] = userFromDb.roles
        .flatMap(role => role.permissions)
        .map(permission => permission.name)
        .filter((value, index, self) => self.indexOf(value) === index);//remove values who's index does not match the first index found for this value

        if(!userFromDb) throw new UnauthorizedException('Invalid Credentials');

        const payload = {
            sub: userFromDb.id,
            username: userFromDb.username,
            roles,
            permissions
        };

        return {
            accessToken: this.jwtService.sign(payload)
        }


      }
    
}
