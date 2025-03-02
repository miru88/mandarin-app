import { Controller, Post, Request} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService
    ) {}

    @Post('create')
    createUser(@Request() request) {
        this.userService.create(request.body);
    }
}
