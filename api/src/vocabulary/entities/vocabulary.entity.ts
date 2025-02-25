import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity() 
export class Vocabulary {//DEFINE relations and the JOIN columns for this
    @PrimaryGeneratedColumn() // Auto-incrementing primary key
    id: number;
  
    @Column({ type: 'text' })
    band: string;
  
    @Column({ type: 'text' })
    chinese: string;
  
    @Column({ type: 'text' })
    pinyin: string;
  
    @Column({ type: 'text' })
    english: string;
  
    @Column({ type: 'integer' })
    number: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}