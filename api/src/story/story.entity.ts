import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Story {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    chinese: string;

    @Column({ type: 'text' })
    english: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    band: string;

    @Column({ type: 'integer' })
    createdByUserId: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;


}