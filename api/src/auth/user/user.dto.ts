import { IsString, IsNumber, IsOptional, IsEmail, Length, isEmail } from 'class-validator';



export class CreateUserDto {

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}

export class LoginUserDto {

    @IsString()
    username: string;

    @IsString()
    password: string;
}
