import { Controller, Post, Request} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService
    ) {}

    @Post('create')
    async createUser(@Request() request) {
       return await this.userService.create(request.body);

    }
}
