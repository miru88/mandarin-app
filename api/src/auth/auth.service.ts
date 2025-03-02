import { Injectable, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

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
      // Force it to be a number and provide a fallback
      const saltRounds = Number(this.configService.get('BCRYPT_SALT_ROUNDS')) || 10;
      
      // Ensure it's a valid number between 4 and 31
      const validSaltRounds = Math.min(Math.max(Math.floor(saltRounds), 4), 31);
      
      return bcrypt.hash(password, validSaltRounds);
      }
    
      //CHANGE THE PARTIAL<USER> INTO A DTO
      async login(user: Partial<User>): Promise<{accesToken: string}> {

        //user should include the username, password, and roles



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
            accesToken: this.jwtService.sign(payload)
        }


      }
    
}
