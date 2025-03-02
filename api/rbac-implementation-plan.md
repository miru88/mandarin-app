# RBAC Implementation Plan with JWT, Passport, NestJS, and PostgreSQL

<!-- ## 1. Database Schema Design

```sql
-- Users table
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(100) UNIQUE NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "createdDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE "role" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) UNIQUE NOT NULL,
  "description" TEXT,
  "createdDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Permissions table
CREATE TABLE "permission" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) UNIQUE NOT NULL,
  "description" TEXT,
  "createdDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User-Role mapping (many-to-many)
CREATE TABLE user_role (
  "userId" INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
  "roleId" INTEGER REFERENCES "role"(id) ON DELETE CASCADE,
  PRIMARY KEY ("userId", "roleId")
);

-- Role-Permission mapping (many-to-many)
CREATE TABLE role_permission (
  "roleId" INTEGER REFERENCES "role"(id) ON DELETE CASCADE,
  "permissionId" INTEGER REFERENCES "permission"(id) ON DELETE CASCADE,
  PRIMARY KEY ("roleId", "permissionId")
);
``` -->

<!-- ## 2. NestJS Project Setup

```bash
# Install NestJS CLI
npm i -g @nestjs/cli

# Create a new NestJS project
nest new rbac-auth-api

# Change to project directory
cd rbac-auth-api

# Install required packages
npm install @nestjs/passport passport passport-jwt passport-local
npm install @nestjs/jwt bcrypt class-validator class-transformer
npm install @nestjs/typeorm typeorm pg
npm install dotenv
``` -->

## 3. Implement Entity Models

### User Entity (`src/users/entities/user.entity.ts`)

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

### Role Entity (`src/roles/entities/role.entity.ts`)

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @CreateDateColumn()
  created_at: Date;
}
```

### Permission Entity (`src/permissions/entities/permission.entity.ts`)

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
```

## 4. Authentication Implementation

### Auth Module Setup (`src/auth/auth.module.ts`)

```typescript
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
```

### Auth Service (`src/auth/auth.service.ts`)

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    // Extract user roles and permissions for JWT payload
    const roles = user.roles.map(role => role.name);
    const permissions = user.roles
      .flatMap(role => role.permissions)
      .map(permission => permission.name)
      .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

    const payload = { 
      sub: user.id, 
      username: user.username,
      roles,
      permissions,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

### JWT Strategy (`src/auth/strategies/jwt.strategy.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      username: payload.username,
      roles: payload.roles,
      permissions: payload.permissions,
    };
  }
}
```

### Local Strategy (`src/auth/strategies/local.strategy.ts`)

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return user;
  }
}
```

### Auth Controller (`src/auth/auth.controller.ts`)

```typescript
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
```

## 5. Role-Based Guards Implementation

### RBAC Guards (`src/auth/guards/roles.guard.ts`)

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
```

### Permission Guard (`src/auth/guards/permissions.guard.ts`)

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredPermissions.some((permission) => 
      user.permissions?.includes(permission)
    );
  }
}
```

### Role and Permission Decorators (`src/auth/decorators/roles.decorator.ts`)

```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

```typescript
// src/auth/decorators/permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);
```

## 6. Usage In Controllers

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Permissions } from '../auth/decorators/permissions.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  
  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:products')
  findAll() {
    return ['product1', 'product2'];
  }
  
  @Post()
  @UseGuards(RolesGuard, PermissionsGuard) 
  @Roles('admin')
  @Permissions('create:products')
  create() {
    // Create product logic
  }
  
  @Delete(':id')
  @UseGuards(RolesGuard) 
  @Roles('admin')
  remove() {
    // Delete product logic
  }
}
```

## 7. Seed Data for Testing

Create a seed file to initialize your database with test data:

```typescript
// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Seed Permissions
    const permissionRepository = getRepository(Permission);
    const permissionsData = [
      { name: 'create:users', description: 'Can create users' },
      { name: 'read:users', description: 'Can read users' },
      { name: 'update:users', description: 'Can update users' },
      { name: 'delete:users', description: 'Can delete users' },
      { name: 'create:products', description: 'Can create products' },
      { name: 'read:products', description: 'Can read products' },
      { name: 'update:products', description: 'Can update products' },
      { name: 'delete:products', description: 'Can delete products' },
    ];

    const permissions = [];
    for (const permData of permissionsData) {
      let permission = await permissionRepository.findOne({ where: { name: permData.name } });
      if (!permission) {
        permission = await permissionRepository.save(permData);
        console.log(`Permission "${permData.name}" created`);
      } else {
        console.log(`Permission "${permData.name}" already exists`);
      }
      permissions.push(permission);
    }

    // Seed Roles
    -- Insert sample users
INSERT INTO "user" (username, email, password) VALUES
  ('admin', 'admin@example.com', '$2a$12$1InE4CuGv.mMXjvQgGmTn.CgNRbGV0RvUGNLHLc.TYAuGCcyO2ORi'), -- password: admin123
  ('john_doe', 'john.doe@example.com', '$2a$12$fENTMXfXsCspvrXZBl.IOuIrOHdDiAbZY8MrLqzeqGbXwccXrjPWC'), -- password: password123
  ('jane_smith', 'jane.smith@example.com', '$2a$12$mwTMfBg5Xs0AJJOGGQFdAOl5H9XGBNTzZsEp2xBnJp/WMvHgx8wA2'), -- password: jane2023
  ('dev_user', 'dev@example.com', '$2a$12$pZmUvs5P1W14XK9F/NZkOe3FCq0gVJYLmLJfQ5h.OIWmTHBDJYYK6'), -- password: dev2023
  ('support_agent', 'support@example.com', '$2a$12$hGrw1GrW9RnHN7FmRNu1aOk2J.bY1YalQ2mVJZsH8vOZfvNnqRiZS'); -- password: support2023

-- Insert roles
INSERT INTO "role" (name, description) VALUES
  ('ADMIN', 'System administrator with full access'),
  ('USER', 'Regular user with limited access'),
  ('DEVELOPER', 'User with development privileges'),
  ('SUPPORT', 'Customer support staff');

-- Insert permissions
INSERT INTO "permission" (name, description) VALUES
  ('USER_CREATE', 'Can create new users'),
  ('USER_READ', 'Can view user information'),
  ('USER_UPDATE', 'Can update user information'),
  ('USER_DELETE', 'Can delete users'),
  ('ROLE_MANAGE', 'Can manage roles'),
  ('PERMISSION_MANAGE', 'Can manage permissions'),
  ('CONTENT_CREATE', 'Can create new content'),
  ('CONTENT_READ', 'Can view content'),
  ('CONTENT_UPDATE', 'Can update content'),
  ('CONTENT_DELETE', 'Can delete content'),
  ('REPORT_VIEW', 'Can view reports');

-- Assign roles to users
INSERT INTO user_role ("userId", "roleId") VALUES
  (1, 1), -- admin has ADMIN role
  (2, 2), -- john_doe has USER role
  (3, 2), -- jane_smith has USER role
  (3, 3), -- jane_smith also has DEVELOPER role
  (4, 3), -- dev_user has DEVELOPER role
  (5, 4); -- support_agent has SUPPORT role

-- Assign permissions to roles
INSERT INTO role_permission ("roleId", "permissionId") VALUES
  -- ADMIN role has all permissions
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11),
  
  -- USER role permissions
  (2, 2), -- USER_READ
  (2, 8), -- CONTENT_READ
  
  -- DEVELOPER role permissions
  (3, 2), -- USER_READ
  (3, 7), -- CONTENT_CREATE
  (3, 8), -- CONTENT_READ
  (3, 9), -- CONTENT_UPDATE
  
  -- SUPPORT role permissions
  (4, 2), -- USER_READ
  (4, 8), -- CONTENT_READ
  (4, 11); -- REPORT_VIEW

## 8. Configuration Setup

Create a `.env` file in the root of your project:

```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=rbac_db

# JWT
JWT_SECRET=your_strong_secret_key

Update `app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

// Load dotenv at the earliest point
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuthModule,
  ],
})
export class AppModule {}
```

## 9. API Implementation Order and Best Practices

1. Implement database migrations instead of using `synchronize: true` in production
2. Seed initial roles and permissions
3. Implement error handling middleware
4. Add validation pipes for DTO validation
5. Implement refresh token functionality
6. Add rate limiting for authentication endpoints
7. Consider implementing a user service with password hashing
8. Add logging for security events
9. Set proper CORS configuration
10. Use environment-specific configuration
