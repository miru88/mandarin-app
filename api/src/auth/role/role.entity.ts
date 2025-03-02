import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from '../permission/permission.entity';


@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
     
    @CreateDateColumn()
    createdDate: Date;

    @ManyToMany(() => Permission, {eager: true})
    @JoinTable({
        name: 'role_permission',
        joinColumn: {name: 'roleId', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'permissionId', referencedColumnName:'id'}
    })
    permissions: Permission[];


}