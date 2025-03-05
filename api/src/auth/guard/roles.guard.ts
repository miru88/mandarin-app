import { Injectable, CanActivate, ExecutionContext, ForbiddenException, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';


//this makes a custom decorator
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);


@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()

        ]);

        if(!requiredRoles) return true;

        const {user} = context.switchToHttp().getRequest();

        if(!user) return false;

        return requiredRoles.some((role) => user.roles?.includes(role));


    }
}

