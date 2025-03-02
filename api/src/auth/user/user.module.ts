import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    exports: [TypeOrmModule.forFeature([User]),UserService],
    providers: [UserService]
})
export class UserModule {}
