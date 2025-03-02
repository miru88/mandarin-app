import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    exports: [TypeOrmModule.forFeature([Role])]
})
export class RoleModule {}
