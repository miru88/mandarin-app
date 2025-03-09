import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity() 
export class VocabularyList {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    name: string;
  
}