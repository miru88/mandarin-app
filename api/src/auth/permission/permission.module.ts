import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    exports: [TypeOrmModule.forFeature([Permission])]
})
export class PermissionModule {}
