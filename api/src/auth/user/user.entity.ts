import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../role/role.entity';



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @ManyToMany(() => Role, {eager: true})
    @JoinTable({
        name: 'user_role',
        joinColumn: {name: 'userId', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'roleId', referencedColumnName: 'id'}
    })  // The semicolon here was causing the error - removed it
    roles: Role[];


}