import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ConflictException  } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) 
                readonly userRepository: Repository<User>,
                @Inject(forwardRef(() => AuthService))
                private authService: AuthService
) {}


    async getOneById(userId: number): Promise<User | null> {
        return await this.userRepository.findOneBy({id:userId});
    }

    async getOneByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOneBy({username});
    }

    async create(newUserObject: {username: string, password: string, email: string}): Promise<User> {

        const existingUser: User = await this.userRepository.findOneBy({username: newUserObject.username});

        if(existingUser) throw new ConflictException ('User already exists');

        const hashedPassword: string = await this.authService.hashPassword(newUserObject.password);

        const newUser: User = this.userRepository.create({username: newUserObject.username, email: newUserObject.email, password: hashedPassword });

        return await this.userRepository.save(newUser);
    }
}
